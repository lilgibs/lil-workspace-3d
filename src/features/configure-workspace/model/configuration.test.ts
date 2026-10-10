import { describe, expect, it } from "vitest";
import { emptyWorkspace } from "@/entities/workspace";
import { PRESETS, applyPreset, matchesPreset, projectWorkspace, restoreConfiguration, selectFurniture, setAccessoryQuantity } from "./configuration";

describe("workspace configuration", () => {
  it("starts with no furniture, no charges, and a one-month duration", () => {
    const initial = emptyWorkspace();
    expect(initial.rentalMonths).toBe(1);
    expect(projectWorkspace(initial)).toMatchObject({ monthlyTotal: 0, periodEstimate: 0, itemCount: 0, isComplete: false });
  });

  it("requires a desk before accessories and enforces quantity bounds", () => {
    const initial = emptyWorkspace();
    expect(setAccessoryQuantity(initial, "monitor-standard", 1)).toBe(initial);
    const desk = selectFurniture(initial, "desk-compact");
    const full = setAccessoryQuantity(desk, "monitor-standard", 99);
    expect(full.accessoryCounts["monitor-standard"]).toBe(2);
    expect(setAccessoryQuantity(full, "monitor-standard", 0).accessoryCounts).toEqual({});
    expect(setAccessoryQuantity(desk, "plant-small", 5).accessoryCounts["plant-small"]).toBe(1);
    expect(setAccessoryQuantity(desk, "monitor-standard", 1.5)).toBe(desk);
    expect(setAccessoryQuantity(desk, "missing-id", 1)).toBe(desk);
  });

  it("replaces furniture while preserving accessories, chair, and duration", () => {
    let setup = selectFurniture(emptyWorkspace(), "desk-compact");
    setup = selectFurniture(setup, "chair-mesh");
    setup = setAccessoryQuantity(setup, "monitor-standard", 2);
    setup = { ...setup, rentalMonths: 3 };
    const changed = selectFurniture(setup, "desk-wide");
    expect(changed).toEqual({ ...setup, deskId: "desk-wide" });
    const chair = selectFurniture(changed, "chair-ergo");
    expect(chair).toEqual({ ...changed, chairId: "chair-ergo" });
    expect(selectFurniture(chair, "lamp-task")).toBe(chair);
  });

  it("matches the reference total and removes optional charges independently", () => {
    let setup = selectFurniture(emptyWorkspace(), "desk-compact");
    setup = selectFurniture(setup, "chair-mesh");
    setup = setAccessoryQuantity(setup, "monitor-standard", 2);
    setup = setAccessoryQuantity(setup, "lamp-task", 1);
    setup = setAccessoryQuantity(setup, "plant-small", 1);
    setup = { ...setup, rentalMonths: 3 };
    expect(projectWorkspace(setup)).toMatchObject({ monthlyTotal: 910000, periodEstimate: 2730000, itemCount: 6, isComplete: true });
    const removed = setAccessoryQuantity(setup, "plant-small", 0);
    expect(projectWorkspace(removed)).toMatchObject({ monthlyTotal: 880000, periodEstimate: 2640000, itemCount: 5 });
    expect(removed.accessoryCounts["lamp-task"]).toBe(1);
  });

  it("calculates all 48 complete furniture combinations consistently", () => {
    for (const deskId of ["desk-compact", "desk-wide"]) for (const chairId of ["chair-mesh", "chair-ergo"]) for (const monitors of [0, 1, 2]) for (const lamp of [0, 1]) for (const plant of [0, 1]) {
      let config = selectFurniture(emptyWorkspace(), deskId);
      config = selectFurniture(config, chairId);
      config = setAccessoryQuantity(config, "monitor-standard", monitors);
      config = setAccessoryQuantity(config, "lamp-task", lamp);
      config = setAccessoryQuantity(config, "plant-small", plant);
      const expected = (deskId === "desk-compact" ? 250000 : 350000) + (chairId === "chair-mesh" ? 180000 : 280000) + monitors * 200000 + lamp * 50000 + plant * 30000;
      expect(projectWorkspace(config).monthlyTotal).toBe(expected);
      expect(projectWorkspace(config).isComplete).toBe(true);
    }
  });
});

describe("saved workspace recovery", () => {
  it.each([null, "not-json", "null", "42", JSON.stringify({ schemaVersion: 2 })])("recovers malformed or unsupported storage: %s", (raw) => {
    expect(restoreConfiguration(raw).config).toEqual(emptyWorkspace());
  });

  it("keeps valid choices but drops wrong-category IDs and invalid accessories", () => {
    const { config, notice } = restoreConfiguration(JSON.stringify({ schemaVersion: 1, deskId: "desk-wide", chairId: "desk-compact", accessoryCounts: { "monitor-standard": 6, "plant-small": 0.5, "lamp-task": 1, "unknown": 2 }, rentalMonths: 12 }));
    expect(config).toEqual({ schemaVersion: 1, deskId: "desk-wide", chairId: null, accessoryCounts: { "monitor-standard": 2, "lamp-task": 1 }, rentalMonths: 1 });
    expect(notice).toBeTruthy();
  });

  it("restores a valid setup exactly and preserves its price", () => {
    const config = { ...emptyWorkspace(), deskId: "desk-compact", chairId: "chair-ergo", accessoryCounts: { "monitor-standard": 1 }, rentalMonths: 6 as const };
    const restored = restoreConfiguration(JSON.stringify(config));
    expect(restored).toEqual({ config, notice: null });
    expect(projectWorkspace(restored.config).periodEstimate).toBe(4380000);
  });

  it("removes accessories when a saved desk no longer exists", () => {
    const restored = restoreConfiguration(JSON.stringify({ schemaVersion: 1, deskId: "discontinued", chairId: "chair-mesh", accessoryCounts: { "monitor-standard": 2 }, rentalMonths: 3 }));
    expect(restored.config.deskId).toBeNull();
    expect(restored.config.accessoryCounts).toEqual({});
    expect(projectWorkspace(restored.config).monthlyTotal).toBe(180000);
  });
});

describe("quick start presets", () => {
  it("applies every preset through the same selection rules and keeps the duration", () => {
    for (const preset of PRESETS) {
      const config = applyPreset({ ...emptyWorkspace(), rentalMonths: 6 }, preset.id);
      expect(config.rentalMonths).toBe(6);
      expect(matchesPreset(config, preset)).toBe(true);
      expect(projectWorkspace(config).isComplete).toBe(true);
    }
    expect(applyPreset(emptyWorkspace(), "unknown")).toEqual(emptyWorkspace());
  });

  it("stops matching a preset once the setup is edited", () => {
    const focus = applyPreset(emptyWorkspace(), "focus");
    expect(matchesPreset(setAccessoryQuantity(focus, "monitor-standard", 2), PRESETS[0])).toBe(false);
    expect(matchesPreset(selectFurniture(focus, "chair-mesh"), PRESETS[0])).toBe(false);
  });
});
