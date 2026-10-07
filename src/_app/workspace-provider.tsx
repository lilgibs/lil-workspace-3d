"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createWorkspaceStore, WorkspaceStoreContext, emptyWorkspace } from "@/entities/workspace";
import { WORKSPACE_STORAGE_KEY, restoreConfiguration } from "@/features/configure-workspace";
import { RENTAL_STORAGE_KEY, restoreDemoRental } from "@/features/submit-rental";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createWorkspaceStore);

  useEffect(() => {
    try {
      const { config, notice } = restoreConfiguration(localStorage.getItem(WORKSPACE_STORAGE_KEY));
      let request = null;
      try {
        const savedRequest = sessionStorage.getItem(RENTAL_STORAGE_KEY);
        request = restoreDemoRental(savedRequest, config);
        if (savedRequest && !request) sessionStorage.removeItem(RENTAL_STORAGE_KEY);
      } catch { /* Confirmation still works in memory. */ }
      store.getState().hydrate(config, notice, request);
    } catch {
      store.getState().hydrate(emptyWorkspace(), "Your setup is available for this visit, but this browser cannot save it.");
    }
    let previous = store.getState().config;
    let previousRequest = store.getState().rentalRequest;
    return store.subscribe((state) => {
      if (state.rentalRequest !== previousRequest) {
        previousRequest = state.rentalRequest;
        try {
          if (state.rentalRequest) sessionStorage.setItem(RENTAL_STORAGE_KEY, JSON.stringify(state.rentalRequest));
          else sessionStorage.removeItem(RENTAL_STORAGE_KEY);
        } catch { /* A demo request does not require browser storage. */ }
      }
      if (state.config !== previous) {
        previous = state.config;
        try {
          localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(state.config));
        } catch {
          store.getState().setStorageNotice("Your setup is available for this visit, but this browser cannot save it.");
        }
      }
    });
  }, [store]);

  return <WorkspaceStoreContext.Provider value={store}>{children}</WorkspaceStoreContext.Provider>;
}
