import { PRODUCTS, findProduct, monthlySubtotal } from "@/entities/product";
import { emptyWorkspace, type WorkspaceConfig } from "@/entities/workspace";

export const WORKSPACE_STORAGE_KEY = "lil-workspace:configuration";

export function restoreConfiguration(raw: string | null): { config: WorkspaceConfig; notice: string | null } {
  const initial = { config: emptyWorkspace(), notice: null };
  if (!raw) return initial;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || !("schemaVersion" in data) || data.schemaVersion !== 1) {
      return { ...initial, notice: "Your saved setup could not be restored. Start with a fresh workspace." };
    }
    const source = data as Record<string, unknown>;
    let corrected = false;
    const selectedId = (key: "deskId" | "chairId", category: "desk" | "chair") => {
      const id = source[key];
      if (id === null || id === undefined) return null;
      if (typeof id === "string" && findProduct(id)?.category === category) return id;
      corrected = true;
      return null;
    };
    const deskId = selectedId("deskId", "desk");
    const chairId = selectedId("chairId", "chair");
    const counts = source.accessoryCounts && typeof source.accessoryCounts === "object" && !Array.isArray(source.accessoryCounts) ? source.accessoryCounts as Record<string, unknown> : {};
    const accessoryCounts: Record<string, number> = {};
    for (const [id, count] of Object.entries(counts)) {
      const product = findProduct(id);
      if (!product || product.category === "desk" || product.category === "chair" || typeof count !== "number" || !Number.isInteger(count) || count < 0) {
        corrected = true;
        continue;
      }
      const quantity = deskId ? Math.min(count, product.maxQuantity) : 0;
      if (quantity !== count) corrected = true;
      if (quantity) accessoryCounts[id] = quantity;
    }
    const rentalMonths = source.rentalMonths === 3 || source.rentalMonths === 6 ? source.rentalMonths : 1;
    if (source.rentalMonths !== rentalMonths) corrected = true;
    return { config: { schemaVersion: 1, deskId, chairId, accessoryCounts, rentalMonths }, notice: corrected ? "Some saved items were unavailable or invalid. The rest of your setup is ready." : null };
  } catch {
    return { ...initial, notice: "Your saved setup could not be restored. Start with a fresh workspace." };
  }
}

export function selectFurniture(config: WorkspaceConfig, id: string): WorkspaceConfig {
  const product = findProduct(id);
  if (!product || (product.category !== "desk" && product.category !== "chair")) return config;
  return { ...config, [product.category === "desk" ? "deskId" : "chairId"]: id };
}

export function setAccessoryQuantity(config: WorkspaceConfig, id: string, quantity: number): WorkspaceConfig {
  const product = findProduct(id);
  if (!config.deskId || !product || product.category === "desk" || product.category === "chair" || !Number.isInteger(quantity)) return config;
  const accessoryCounts = { ...config.accessoryCounts };
  const count = Math.max(0, Math.min(product.maxQuantity, quantity));
  if (count) accessoryCounts[id] = count;
  else delete accessoryCounts[id];
  return { ...config, accessoryCounts };
}

export function projectWorkspace(config: WorkspaceConfig) {
  const desk = findProduct(config.deskId);
  const chair = findProduct(config.chairId);
  const lines = PRODUCTS.flatMap((product) => {
    const quantity = product.id === config.deskId || product.id === config.chairId ? 1 : config.accessoryCounts[product.id] ?? 0;
    return quantity > 0 ? [{ product, productId: product.id, quantity }] : [];
  });
  const monthlyTotal = monthlySubtotal(lines);
  return { desk, chair, lines, monthlyTotal, periodEstimate: monthlyTotal * config.rentalMonths, itemCount: lines.reduce((sum, line) => sum + line.quantity, 0), isComplete: Boolean(desk && chair) };
}
