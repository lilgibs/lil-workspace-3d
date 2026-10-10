"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatIdr } from "@/entities/product";
import { useWorkspaceViewModel } from "@/features/configure-workspace";
import { CatalogPanel } from "@/widgets/catalog-panel";
import { WorkspacePreview } from "@/widgets/workspace-preview";
import { WorkspaceHeader } from "@/shared/ui/workspace-header";
import { ConfirmationDialog } from "@/shared/ui/confirmation-dialog";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { primaryButtonStyles } from "@/shared/ui/button-styles";
import { SkipLink } from "@/shared/ui/skip-link";
import { StorageNotice } from "@/shared/ui/storage-notice";
import { useCountUp } from "@/shared/lib/use-count-up";

export function BuilderPage() {
  const model = useWorkspaceViewModel();
  const router = useRouter();
  const [resetOpen, setResetOpen] = useState(false);
  const monthly = useCountUp(model.monthlyTotal, { step: 1000 });
  const period = useCountUp(model.periodEstimate, { step: 1000 });
  return (
    <div className="builder-shell mx-auto max-w-[1440px] px-10 max-catalog:px-7 max-phone:px-[18px] max-phone:pb-[222px] [@media(max-height:550px)_and_(max-width:1023px)]:pb-0">
      <SkipLink href="#builder-main">Skip to builder</SkipLink>
      <WorkspaceHeader />
      <div className="builder-heading flex items-end justify-between gap-5 pt-[23px] pb-[26px] max-phone:items-start max-phone:gap-3 max-phone:pt-[18px] max-phone:pb-[22px]">
        <div className="min-w-0">
          <Link href="/" className="back-link mb-[9px] inline-flex min-h-7 items-center gap-1.5 text-[13px] text-muted no-underline hover:text-green max-phone:mb-[7px] max-phone:text-[12px]"><ArrowIcon back small />Back to home</Link>
          <h1 className="font-display text-[38px] leading-[1.2] font-normal tracking-[-1.4px] max-lg:text-[34px] max-phone:max-w-[235px] max-phone:text-[29px] max-phone:leading-[1.18] max-phone:tracking-[-.9px]">A space that feels <em className="font-normal text-green max-phone:whitespace-nowrap">like you.</em></h1>
        </div>
        <button className="reset-setup-button inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[7px] border border-line bg-transparent px-[15px] text-[13px] leading-normal whitespace-nowrap text-muted not-disabled:hover:border-[#a7b598] not-disabled:hover:text-green disabled:cursor-not-allowed disabled:opacity-[.48] max-phone:mt-7 max-phone:w-11 max-phone:p-0 max-phone:text-[0px]" type="button" aria-label="Reset setup" disabled={!model.hydrated || (model.itemCount === 0 && model.config.rentalMonths === 1)} onClick={() => setResetOpen(true)}>
          <span className="text-[19px] max-phone:text-xl max-phone:leading-normal" aria-hidden="true">↺</span>Reset setup
        </button>
      </div>
      {model.storageNotice && <StorageNotice message={model.storageNotice} onDismiss={model.dismissNotice} />}
      <main id="builder-main" tabIndex={-1} className="builder-main grid grid-cols-[330px_minmax(0,1fr)] items-start gap-[25px] pb-[26px] max-catalog:grid-cols-[315px_minmax(0,1fr)] max-catalog:gap-5 max-lg:flex max-lg:flex-col max-lg:gap-[27px]" data-hydrated={model.hydrated}>
        <CatalogPanel model={model} />
        <div className="builder-preview-column min-w-0 max-lg:order-first max-lg:w-full">
          <WorkspacePreview config={model.config} hydrated={model.hydrated} />
          <div className="workspace-inventory px-[3px] pt-5 max-lg:pt-[15px]" aria-label="Selected workspace items">
            <span className="eyebrow text-[12px] font-semibold tracking-[1.4px] text-muted uppercase">In your workspace</span>
            {model.hydrated && model.lines.length ? (
              <ul className="mt-[11px] flex list-none flex-wrap gap-[7px] max-phone:gap-[5px]">
                {model.lines.map((line) => <li className="inline-flex gap-[5px] rounded-[5px] border border-[#dce3ce] bg-[#e9edde] px-2.5 py-[7px] text-[13px] text-[#4f6247] max-phone:px-2 max-phone:py-1.5 max-phone:text-[12px]" key={line.productId}>{line.product.name}{line.quantity > 1 && <span className="font-semibold"> × {line.quantity}</span>}</li>)}
              </ul>
            ) : <p className="mt-[9px] text-[13px] text-muted">{model.hydrated ? "A blank canvas, waiting for you." : "Restoring your workspace…"}</p>}
          </div>
        </div>
      </main>
      <footer className="builder-total-bar sticky bottom-0 z-[4] grid grid-cols-[145px_1fr_1fr_auto] items-center gap-[26px] border-t border-line bg-[#f7f4edfa] pt-[19px] pb-[21px] backdrop-blur-[12px] max-catalog:grid-cols-[120px_minmax(0,1fr)_minmax(150px,1fr)_auto] max-catalog:gap-4 max-phone:fixed max-phone:inset-x-0 max-phone:grid-cols-[104px_minmax(0,1fr)] max-phone:gap-x-[14px] max-phone:gap-y-2.5 max-phone:px-[18px] max-phone:pt-[13px] max-phone:pb-[calc(13px_+_env(safe-area-inset-bottom))] [@media(max-height:550px)_and_(max-width:1023px)]:static">
        <div className="rental-duration flex flex-col gap-[7px] max-phone:gap-[5px]">
          <label className="text-[12px] text-muted max-phone:text-[12px]" htmlFor="rental-months">Rental duration</label>
          <select className="min-h-11 w-[120px] cursor-pointer rounded-md border border-[#d4dbca] bg-[#fcfbf7] px-2.5 font-sans text-[13px] leading-normal text-foreground disabled:cursor-not-allowed max-phone:w-[99px] max-phone:text-[13px]" id="rental-months" value={model.config.rentalMonths} disabled={!model.hydrated} onChange={(event) => model.setRentalMonths(Number(event.target.value) as 1 | 3 | 6)}>
            <option value={1}>1 month</option><option value={3}>3 months</option><option value={6}>6 months</option>
          </select>
        </div>
        <div className="rental-total border-l border-line pl-[27px] max-catalog:pl-[23px] max-phone:pl-[15px]">
          <span className="text-[12px] text-muted max-phone:text-[12px]">Estimated monthly rental</span>
          <p className="mt-1"><strong className="text-[25px] leading-[1.4] font-[550] tracking-[-.8px] text-foreground max-phone:text-[23px]">{model.hydrated ? formatIdr(monthly) : "—"}</strong><span className="text-[13px] text-muted max-phone:block max-phone:text-[12px]"> / month</span></p>
        </div>
        <div className="rental-period flex flex-col gap-[5px] max-phone:col-span-full max-phone:flex-row max-phone:flex-wrap max-phone:items-baseline max-phone:gap-x-[7px] max-phone:gap-y-0">
          <span className="text-[12px] text-muted max-phone:text-[12px]">{model.config.rentalMonths}-month estimate</span>
          <strong className="text-sm leading-normal font-[550] text-foreground max-phone:text-[12px]">{model.hydrated ? formatIdr(period) : "—"}</strong>
          <p className="text-[12px] leading-[1.6] text-muted max-phone:mt-[3px] max-phone:w-full max-phone:text-[12px]">Equipment only. Delivery, deposit, and taxes excluded.</p>
        </div>
        <div className="builder-checkout flex flex-col items-stretch gap-2 max-phone:col-span-full">
          <div id="setup-readiness" className={"setup-readiness flex items-center justify-center gap-2 text-[12px] max-phone:hidden " + (model.isComplete ? "is-ready text-green" : "text-muted")} aria-live="polite">
            <span className="text-lg leading-normal" aria-hidden="true">{model.isComplete ? "✓" : "○"}</span>
            {!model.hydrated ? "Restoring setup" : model.isComplete ? "Your setup is ready" : !model.desk ? "Start with a desk" : "Pick a chair next"}
          </div>
          <button type="button" className={primaryButtonStyles("review") + " review-button"} disabled={!model.hydrated || !model.isComplete} aria-describedby="setup-readiness" onClick={() => router.push("/summary")}>Review Setup<ArrowIcon /></button>
        </div>
      </footer>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{model.announcement} {model.hydrated ? model.itemCount + " items selected. Estimated monthly rental " + model.monthlyTotal + " rupiah." : ""}</span>
      <ConfirmationDialog open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { model.resetSetup(); setResetOpen(false); }} />
    </div>
  );
}
