import { findProduct } from "@/entities/product";
import type { DemoRentalRequest, WorkspaceConfig } from "@/entities/workspace";

export const RENTAL_STORAGE_KEY = "lil-workspace:demo-rental";

export function canRentWorkspace(value: unknown): value is WorkspaceConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Record<string, unknown>;
  if (config.schemaVersion !== 1 || typeof config.deskId !== "string" || typeof config.chairId !== "string") return false;
  if (findProduct(config.deskId)?.category !== "desk" || findProduct(config.chairId)?.category !== "chair") return false;
  if (![1, 3, 6].includes(config.rentalMonths as number)) return false;
  if (!config.accessoryCounts || typeof config.accessoryCounts !== "object" || Array.isArray(config.accessoryCounts)) return false;
  return Object.entries(config.accessoryCounts).every(([id, quantity]) => {
    const product = findProduct(id);
    return product && product.category !== "desk" && product.category !== "chair" &&
      typeof quantity === "number" && Number.isInteger(quantity) && quantity >= 0 && quantity <= product.maxQuantity;
  });
}

export function createDemoRental(config: WorkspaceConfig, reference: string): DemoRentalRequest | null {
  if (!canRentWorkspace(config) || !/^LW-[A-F0-9]{8}$/.test(reference)) return null;
  return { schemaVersion: 1, reference, config: { ...config, accessoryCounts: { ...config.accessoryCounts } } };
}

export function matchesWorkspace(first: WorkspaceConfig, second: WorkspaceConfig) {
  const accessories = new Set([...Object.keys(first.accessoryCounts), ...Object.keys(second.accessoryCounts)]);
  return first.deskId === second.deskId && first.chairId === second.chairId && first.rentalMonths === second.rentalMonths &&
    [...accessories].every((id) => (first.accessoryCounts[id] ?? 0) === (second.accessoryCounts[id] ?? 0));
}

export function restoreDemoRental(raw: string | null, config: WorkspaceConfig): DemoRentalRequest | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const source = value as Record<string, unknown>;
    if (source.schemaVersion !== 1 || typeof source.reference !== "string" || !canRentWorkspace(source.config)) return null;
    const request = createDemoRental(source.config, source.reference);
    return request && matchesWorkspace(request.config, config) ? request : null;
  } catch {
    return null;
  }
}
