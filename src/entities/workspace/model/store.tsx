"use client";

import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

export type RentalMonths = 1 | 3 | 6;
export type WorkspaceConfig = {
  schemaVersion: 1;
  deskId: string | null;
  chairId: string | null;
  accessoryCounts: Record<string, number>;
  rentalMonths: RentalMonths;
};

export type DemoRentalRequest = {
  schemaVersion: 1;
  reference: string;
  config: WorkspaceConfig;
};

export function emptyWorkspace(): WorkspaceConfig {
  return { schemaVersion: 1, deskId: null, chairId: null, accessoryCounts: {}, rentalMonths: 1 };
}

type WorkspaceState = {
  config: WorkspaceConfig;
  rentalRequest: DemoRentalRequest | null;
  hydrated: boolean;
  storageNotice: string | null;
  updateConfig: (update: (config: WorkspaceConfig) => WorkspaceConfig) => void;
  hydrate: (config: WorkspaceConfig, notice: string | null, rentalRequest?: DemoRentalRequest | null) => void;
  confirmRental: (request: DemoRentalRequest) => void;
  clearRentalRequest: () => void;
  setStorageNotice: (notice: string | null) => void;
};

export function createWorkspaceStore() {
  return createStore<WorkspaceState>()((set) => ({
    config: emptyWorkspace(),
    rentalRequest: null,
    hydrated: false,
    storageNotice: null,
    updateConfig: (update) => set((state) => ({ config: update(state.config), rentalRequest: null })),
    hydrate: (config, storageNotice, rentalRequest = null) => set({ config, storageNotice, rentalRequest, hydrated: true }),
    confirmRental: (rentalRequest) => set((state) => state.rentalRequest ? state : { rentalRequest }),
    clearRentalRequest: () => set({ rentalRequest: null }),
    setStorageNotice: (storageNotice) => set({ storageNotice }),
  }));
}

export const WorkspaceStoreContext = createContext<ReturnType<typeof createWorkspaceStore> | null>(null);

export function useWorkspaceStore<T>(selector: (state: WorkspaceState) => T) {
  const store = useContext(WorkspaceStoreContext);
  if (!store) throw new Error("WorkspaceStoreProvider is required");
  return useStore(store, selector);
}
