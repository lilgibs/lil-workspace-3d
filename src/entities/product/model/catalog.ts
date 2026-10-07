export type Category = "desk" | "chair" | "monitor" | "lamp" | "plant";

export type Product = {
  id: string;
  category: Category;
  name: string;
  description: string;
  monthlyPriceIdr: number;
  maxQuantity: number;
  visualKey: string;
  dimensions: { width: number; depth: number; height: number };
};

export const PRODUCTS: readonly Product[] = [
  { id: "desk-compact", category: "desk", name: "Compact Desk", description: "A little room for big ideas. 120 × 60 cm.", monthlyPriceIdr: 250000, maxQuantity: 1, visualKey: "compact", dimensions: { width: 1.2, depth: 0.6, height: 0.75 } },
  { id: "desk-wide", category: "desk", name: "Wide Desk", description: "Stretch out and settle in. 140 × 70 cm.", monthlyPriceIdr: 350000, maxQuantity: 1, visualKey: "wide", dimensions: { width: 1.4, depth: 0.7, height: 0.75 } },
  { id: "chair-mesh", category: "chair", name: "Mesh Chair", description: "Airy mesh, easy comfort.", monthlyPriceIdr: 180000, maxQuantity: 1, visualKey: "mesh", dimensions: { width: 0.58, depth: 0.58, height: 1.05 } },
  { id: "chair-ergo", category: "chair", name: "Ergonomic Chair", description: "High back. Headrest. Happy shoulders.", monthlyPriceIdr: 280000, maxQuantity: 1, visualKey: "ergo", dimensions: { width: 0.64, depth: 0.65, height: 1.25 } },
  { id: "monitor-standard", category: "monitor", name: "24 Inch Monitor", description: "More screen, more breathing room.", monthlyPriceIdr: 200000, maxQuantity: 2, visualKey: "monitor", dimensions: { width: 0.53, depth: 0.18, height: 0.4 } },
  { id: "lamp-task", category: "lamp", name: "Task Lamp", description: "A warm glow for the late ideas.", monthlyPriceIdr: 50000, maxQuantity: 1, visualKey: "lamp", dimensions: { width: 0.14, depth: 0.14, height: 0.5 } },
  { id: "plant-small", category: "plant", name: "Desk Plant", description: "A small dose of green.", monthlyPriceIdr: 30000, maxQuantity: 1, visualKey: "plant", dimensions: { width: 0.12, depth: 0.12, height: 0.24 } },
];

export function findProduct(id: string | null | undefined) {
  return PRODUCTS.find((product) => product.id === id);
}

export function monthlySubtotal(lines: readonly { productId: string; quantity: number }[]) {
  return lines.reduce((total, line) => total + (findProduct(line.productId)?.monthlyPriceIdr ?? 0) * line.quantity, 0);
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}
