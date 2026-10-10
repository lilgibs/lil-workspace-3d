"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { formatIdr } from "@/entities/product";
import type { useWorkspaceViewModel } from "@/features/configure-workspace";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { primaryButtonStyles } from "@/shared/ui/button-styles";
import { useCountUp } from "@/shared/lib/use-count-up";

// Stacks in the narrow drawer footer, lays out as one row in the bar under the preview on desktop.
export function RentalTotals({ model }: { model: ReturnType<typeof useWorkspaceViewModel> }) {
  const router = useRouter();
  const id = useId();
  const monthly = useCountUp(model.monthlyTotal, { step: 1000 });
  const period = useCountUp(model.periodEstimate, { step: 1000 });
  const readiness = !model.hydrated ? "Restoring setup" : model.isComplete ? "Your setup is ready" : !model.desk ? "Start with a desk" : "Pick a chair next";
  return (
    <div className="rental-totals flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
      <div className="flex items-end justify-between gap-3 lg:contents">
        <div className="rental-duration flex flex-col gap-1.5">
          <label className="text-[12px] text-muted lg:sr-only" htmlFor={id + "-months"}>Rental duration</label>
          <select className="min-h-11 w-[120px] cursor-pointer rounded-md border border-[#d4dbca] bg-[#fcfbf7] px-2.5 font-sans text-[13px] leading-normal text-foreground disabled:cursor-not-allowed" id={id + "-months"} value={model.config.rentalMonths} disabled={!model.hydrated} onChange={(event) => model.setRentalMonths(Number(event.target.value) as 1 | 3 | 6)}>
            <option value={1}>1 month</option><option value={3}>3 months</option><option value={6}>6 months</option>
          </select>
        </div>
        <div className="rental-total text-right lg:flex lg:items-baseline lg:gap-2.5 lg:border-l lg:border-line lg:pl-4 lg:text-left">
          <span className="text-[12px] whitespace-nowrap text-muted">Monthly rental</span>
          <p className="leading-tight"><strong className="text-[24px] font-[550] tracking-[-.7px] text-foreground lg:text-[22px]">{model.hydrated ? formatIdr(monthly) : "—"}</strong></p>
        </div>
      </div>
      <p className="rental-period flex items-baseline justify-between gap-3 border-t border-line pt-3 text-[12px] text-muted lg:max-cinema:hidden lg:justify-start lg:gap-2.5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-4"><span className="whitespace-nowrap">{model.config.rentalMonths}-month estimate</span><strong className="text-[13px] font-[550] text-foreground">{model.hydrated ? formatIdr(period) : "—"}</strong></p>
      <p id={id + "-readiness"} className={"setup-readiness flex items-center gap-2 text-[12px] whitespace-nowrap " + (model.isComplete ? "is-ready text-green lg:hidden" : "text-muted")} aria-live="polite"><span className="text-base leading-none" aria-hidden="true">{model.isComplete ? "✓" : "○"}</span>{readiness}</p>
      <button type="button" className={primaryButtonStyles("review") + " review-button w-full whitespace-nowrap lg:ml-auto lg:w-auto"} disabled={!model.hydrated || !model.isComplete} aria-describedby={id + "-readiness"} onClick={() => router.push("/summary")}>Review Setup<ArrowIcon /></button>
    </div>
  );
}
