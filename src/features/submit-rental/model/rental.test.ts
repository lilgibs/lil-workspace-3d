import { describe, expect, it } from "vitest";
import { createWorkspaceStore, emptyWorkspace, type WorkspaceConfig } from "@/entities/workspace";
import { canRentWorkspace, createDemoRental, restoreDemoRental } from "./rental";

const config: WorkspaceConfig = {
  ...emptyWorkspace(), deskId: "desk-compact", chairId: "chair-mesh",
  accessoryCounts: { "monitor-standard": 2, "lamp-task": 1, "plant-small": 1 }, rentalMonths: 3,
};

describe("demo rental confirmation", () => {
  it("requires valid furniture, quantities, schema, and duration before confirming", () => {
    expect(canRentWorkspace(config)).toBe(true);
    for (const invalid of [null, emptyWorkspace(), { ...config, schemaVersion: 2 },
      { ...config, chairId: "desk-wide" }, { ...config, deskId: "missing" },
      { ...config, rentalMonths: 2 }, { ...config, rentalMonths: "3" },
      { ...config, accessoryCounts: [] }, { ...config, accessoryCounts: null },
      { ...config, accessoryCounts: { "monitor-standard": 3 } },
      { ...config, accessoryCounts: { "plant-small": -1 } },
      { ...config, accessoryCounts: { "lamp-task": 0.5 } },
      { ...config, accessoryCounts: { "missing": 1 } },
      { ...config, accessoryCounts: { "desk-wide": 1 } }]) {
      expect(canRentWorkspace(invalid)).toBe(false);
    }
    expect(createDemoRental(emptyWorkspace(), "LW-ABC12345")).toBeNull();
  });

  it("captures an independent snapshot without mutating the builder", () => {
    const source = { ...config, accessoryCounts: { ...config.accessoryCounts } };
    const request = createDemoRental(source, "LW-ABC12345")!;
    source.deskId = "desk-wide";
    source.rentalMonths = 6;
    source.accessoryCounts["monitor-standard"] = 0;
    expect(request.config).toEqual(config);
    expect(request.config.accessoryCounts).not.toBe(source.accessoryCounts);
    expect(createDemoRental(config, "invalid-reference")).toBeNull();
  });

  it("restores only a valid receipt matching the current workspace", () => {
    const request = createDemoRental(config, "LW-ABC12345")!;
    expect(restoreDemoRental(JSON.stringify(request), config)).toEqual(request);
    expect(restoreDemoRental(JSON.stringify(request), { ...config, deskId: "desk-wide" })).toBeNull();
    expect(restoreDemoRental(JSON.stringify(request), { ...config, rentalMonths: 6 })).toBeNull();
    expect(restoreDemoRental(JSON.stringify(request), { ...config, accessoryCounts: {} })).toBeNull();
    expect(restoreDemoRental(JSON.stringify({ ...request, config: { ...config, accessoryCounts: { "monitor-standard": 99 } } }), config)).toBeNull();
    expect(restoreDemoRental(JSON.stringify({ ...request, schemaVersion: 2 }), config)).toBeNull();
    expect(restoreDemoRental("broken-json", config)).toBeNull();
    expect(restoreDemoRental(null, config)).toBeNull();
  });

  it("invalidates confirmation on edits and keeps the snapshot intact", () => {
    const store = createWorkspaceStore();
    store.getState().hydrate(config, null);
    const request = createDemoRental(config, "LW-ABC12345")!;
    store.getState().confirmRental(request);
    store.getState().updateConfig((current) => ({ ...current, rentalMonths: 6 }));
    expect(store.getState().rentalRequest).toBeNull();
    expect(store.getState().config.rentalMonths).toBe(6);
    expect(request.config.rentalMonths).toBe(3);
  });

  it("keeps one request until explicitly returning to edit", () => {
    const store = createWorkspaceStore();
    store.getState().hydrate(config, null);
    const first = createDemoRental(config, "LW-ABC12345")!;
    store.getState().confirmRental(first);
    store.getState().confirmRental(createDemoRental(config, "LW-123ABCDE")!);
    expect(store.getState().rentalRequest).toBe(first);
    store.getState().clearRentalRequest();
    expect(store.getState().config).toEqual(config);
    expect(store.getState().rentalRequest).toBeNull();
  });
});
