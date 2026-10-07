"use client";

import { useState } from "react";
import { emptyWorkspace, useWorkspaceStore, type RentalMonths } from "@/entities/workspace";
import { projectWorkspace, selectFurniture, setAccessoryQuantity } from "./configuration";

export function useWorkspaceViewModel() {
  const config = useWorkspaceStore((state) => state.config);
  const hydrated = useWorkspaceStore((state) => state.hydrated);
  const storageNotice = useWorkspaceStore((state) => state.storageNotice);
  const updateConfig = useWorkspaceStore((state) => state.updateConfig);
  const dismissNotice = useWorkspaceStore((state) => state.setStorageNotice);
  const [announcement, setAnnouncement] = useState("");
  const projection = projectWorkspace(config);

  return {
    config, hydrated, storageNotice, announcement, ...projection,
    selectProduct(id: string) {
      updateConfig((current) => selectFurniture(current, id));
      setAnnouncement("Workspace updated.");
    },
    setAccessoryCount(id: string, count: number) {
      updateConfig((current) => setAccessoryQuantity(current, id, count));
      setAnnouncement(count > 0 ? "Accessory selection updated." : "Accessory removed.");
    },
    setRentalMonths(rentalMonths: RentalMonths) {
      updateConfig((current) => ({ ...current, rentalMonths }));
      setAnnouncement("Rental duration updated.");
    },
    resetSetup() {
      updateConfig(() => emptyWorkspace());
      setAnnouncement("Workspace cleared. Pick a desk to get started.");
    },
    dismissNotice() { dismissNotice(null); },
  };
}
