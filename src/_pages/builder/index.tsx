"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkspaceViewModel } from "@/features/configure-workspace";
import { WorkspacePreview } from "@/widgets/workspace-preview";
import { WorkspaceHeader } from "@/shared/ui/workspace-header";
import { ConfirmationDialog } from "@/shared/ui/confirmation-dialog";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { SkipLink } from "@/shared/ui/skip-link";
import { StorageNotice } from "@/shared/ui/storage-notice";
import { CatalogSidebar } from "./ui/catalog-sidebar";
import { RentalTotals } from "./ui/rental-totals";

export function BuilderPage() {
  const model = useWorkspaceViewModel();
  const [resetOpen, setResetOpen] = useState(false);
  // Desktop: the catalog is a collapsible column. Below lg: a full-height drawer, open by default so choosing comes first.
  const [catalogOpen, setCatalogOpen] = useState(true);
  return (
    // On desktop the builder is an app frame: viewport-high, no page scroll, the catalog scrolls inside its card.
    <div className="builder-shell mx-auto flex max-w-[1440px] flex-col px-10 max-catalog:px-7 lg:h-dvh lg:overflow-hidden max-lg:pb-8 max-phone:px-[18px]">
      <SkipLink href="#builder-main">Skip to builder</SkipLink>
      <WorkspaceHeader />
      <div className="builder-heading flex shrink-0 items-center justify-between gap-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="back-link inline-flex min-h-11 items-center gap-1.5 text-[13px] text-muted no-underline hover:text-green"><ArrowIcon back small /><span className="max-phone:sr-only">Back to home</span></Link>
          <span className="h-4 w-px shrink-0 bg-line" aria-hidden="true" />
          <h1 className="truncate text-[15px] font-semibold tracking-[-.2px] max-phone:text-sm">Build your workspace</h1>
        </div>
        <div className="builder-actions flex shrink-0 items-center gap-2">
          <button className="reset-setup-button inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[7px] border border-line bg-transparent px-[15px] text-[13px] leading-normal whitespace-nowrap text-muted not-disabled:hover:border-[#a7b598] not-disabled:hover:text-green disabled:cursor-not-allowed disabled:opacity-[.48] max-phone:w-11 max-phone:p-0" type="button" aria-label="Reset setup" disabled={!model.hydrated || (model.itemCount === 0 && model.config.rentalMonths === 1)} onClick={() => setResetOpen(true)}>
            <span className="text-[19px] max-phone:text-xl max-phone:leading-normal" aria-hidden="true">↺</span><span className="max-phone:hidden">Reset setup</span>
          </button>
          <button className="catalog-toggle inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[7px] border border-line bg-transparent px-[15px] text-[13px] leading-normal whitespace-nowrap text-muted hover:border-[#a7b598] hover:text-green aria-expanded:border-[#b8c8a9] aria-expanded:bg-[#e9edde] aria-expanded:text-[#4f6247] max-phone:w-11 max-phone:p-0" type="button" aria-expanded={catalogOpen} aria-controls="catalog-sidebar" onClick={() => setCatalogOpen((value) => !value)}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
            <span className="max-phone:sr-only">{catalogOpen ? "Hide catalog" : "Show catalog"}</span>
          </button>
        </div>
      </div>
      {model.storageNotice && <StorageNotice message={model.storageNotice} onDismiss={model.dismissNotice} />}
      <main id="builder-main" tabIndex={-1} className={"builder-main grid min-h-0 flex-1 items-stretch gap-6 pb-6 max-catalog:gap-5 max-lg:flex max-lg:flex-col max-lg:gap-[27px] " + (catalogOpen ? "grid-cols-[minmax(0,1fr)_380px] max-catalog:grid-cols-[minmax(0,1fr)_340px]" : "grid-cols-1")} data-hydrated={model.hydrated}>
        <div className="builder-preview-column flex min-h-0 min-w-0 flex-col gap-4 max-lg:w-full">
          <div className="relative min-h-0 flex-1">
          <WorkspacePreview config={model.config} hydrated={model.hydrated} />
          <div className="workspace-inventory lg:pointer-events-none lg:absolute lg:bottom-4 lg:left-4 lg:z-[1] lg:max-w-[55%] max-lg:px-[3px] max-lg:pt-[15px]" aria-label="Selected workspace items">
            <span className="eyebrow text-[12px] font-semibold tracking-[1.4px] text-muted uppercase">In your workspace</span>
            {model.hydrated && model.lines.length ? (
              <ul className="mt-[11px] flex list-none flex-wrap gap-[7px] max-phone:gap-[5px]">
                {model.lines.map((line) => <li className="inline-flex gap-[5px] rounded-[5px] border border-[#dce3ce] bg-[#e9edde] px-2.5 py-[7px] text-[13px] text-[#4f6247] max-phone:px-2 max-phone:py-1.5 max-phone:text-[12px]" key={line.productId}>{line.product.name}{line.quantity > 1 && <span className="font-semibold"> × {line.quantity}</span>}</li>)}
              </ul>
            ) : <p className="mt-[9px] text-[13px] text-muted">{model.hydrated ? "A blank canvas, waiting for you." : "Restoring your workspace…"}</p>}
          </div>
          </div>
          <div className="builder-total-bar shrink-0 rounded-[13px] border border-[#e0e3d6] bg-[#fcfbf7] px-6 py-4 lg:py-3 max-phone:px-[15px]">
            <RentalTotals model={model} />
          </div>
        </div>
        <CatalogSidebar model={model} open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      </main>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{model.announcement} {model.hydrated ? model.itemCount + " items selected. Estimated monthly rental " + model.monthlyTotal + " rupiah." : ""}</span>
      <ConfirmationDialog open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { model.resetSetup(); setResetOpen(false); }} />
    </div>
  );
}
