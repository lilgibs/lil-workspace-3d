"use client";

import { useWorkspaceStore } from "@/entities/workspace";
import { canRentWorkspace, createDemoRental } from "./rental";

export function useRentalViewModel() {
  const config = useWorkspaceStore((state) => state.config);
  const hydrated = useWorkspaceStore((state) => state.hydrated);
  const rentalRequest = useWorkspaceStore((state) => state.rentalRequest);
  const confirmRental = useWorkspaceStore((state) => state.confirmRental);
  const clearRentalRequest = useWorkspaceStore((state) => state.clearRentalRequest);

  return {
    rentalRequest,
    canSubmit: hydrated && canRentWorkspace(config) && !rentalRequest,
    submitRental() {
      if (!hydrated || rentalRequest) return;
      const reference = `LW-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
      const request = createDemoRental(config, reference);
      if (request) confirmRental(request);
    },
    editSetup: clearRentalRequest,
  };
}
