"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatIdr, ProductThumbnail } from "@/entities/product";
import { projectWorkspace, useWorkspaceViewModel } from "@/features/configure-workspace";
import { useRentalViewModel } from "@/features/submit-rental";
import { WorkspacePreview } from "@/widgets/workspace-preview";
import { WorkspaceHeader } from "@/shared/ui/workspace-header";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { primaryButtonStyles } from "@/shared/ui/button-styles";
import { SkipLink } from "@/shared/ui/skip-link";
import { StorageNotice } from "@/shared/ui/storage-notice";

export function SummaryPage() {
  const workspace = useWorkspaceViewModel();
  const rental = useRentalViewModel();
  const heading = useRef<HTMLHeadingElement>(null);
  const request = rental.rentalRequest;
  const confirmed = Boolean(request);
  const config = request?.config ?? workspace.config;
  const setup = projectWorkspace(config);

  useEffect(() => {
    if (confirmed) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [confirmed]);

  return (
    <div className="summary-shell mx-auto max-w-[1440px] px-10 max-wide:px-7 max-phone:px-[18px]">
      <SkipLink href="#summary-main">Skip to summary</SkipLink>
      <WorkspaceHeader summary />
      <nav className="rental-steps flex items-center gap-8 py-[25px] text-[13px] leading-normal text-muted max-phone:gap-7 max-phone:py-[21px] max-phone:text-[13px]" aria-label="Rental progress">
        <Link className="inline-flex items-center gap-[7px] text-inherit no-underline" href="/builder" onClick={rental.editSetup}><span className="font-display text-[15px] text-[#748268]">01</span> Build</Link>
        <span aria-current={!confirmed ? "step" : undefined} className={"inline-flex items-center gap-[7px] " + (!confirmed ? "current-step font-semibold text-green" : "")}><span className="font-display text-[15px] text-[#748268]">02</span> Review</span>
        <span aria-current={confirmed ? "step" : undefined} className={"inline-flex items-center gap-[7px] " + (confirmed ? "current-step font-semibold text-green" : "")}><span className="font-display text-[15px] text-[#748268]">03</span> Ready</span>
      </nav>
      <main id="summary-main" tabIndex={-1} data-hydrated={workspace.hydrated}>
        <div className={"summary-heading flex items-center gap-[23px] pt-[14px] pb-8 max-phone:items-start max-phone:gap-[15px] max-phone:pt-2.5 max-phone:pb-[25px] " + (confirmed ? "is-confirmed max-phone:flex-col" : "")}>
          {confirmed && <span className="rental-seal grid size-[68px] shrink-0 -rotate-[8deg] place-items-center rounded-full border border-[#b3c4a6] bg-[#e7eddc] text-[33px] text-green max-phone:size-[49px] max-phone:text-[25px]" aria-hidden="true">✓</span>}
          <div>
            <p className="eyebrow mb-[14px] text-[12px] font-semibold tracking-[1.8px] text-green uppercase max-phone:text-[12px] max-phone:tracking-[1.3px]">{confirmed ? "A good place to begin" : "The finishing touches"}</p>
            <h1 className="font-display text-[clamp(34px,3.3vw,48px)] leading-[1.15] font-normal tracking-[-1.7px] focus:outline-none max-stacked:text-[40px] max-phone:text-[34px] max-phone:tracking-[-1px]" ref={heading} tabIndex={-1}>
              {confirmed ? <>A little space. <em className="font-normal text-green">All yours.</em></> : <>One last look. <em className="font-normal text-green">Make it yours.</em></>}
            </h1>
            <p className="summary-description mt-[15px] max-w-[620px] text-sm leading-[1.85] text-muted max-phone:mt-[14px] max-phone:text-[13px]">
              {!workspace.hydrated ? "Restoring your workspace before we review it…" : confirmed ? "Demo request created. No order has been sent and no payment has been taken." : setup.isComplete ? "Your pieces, your pace. Check the details before confirming your rental." : "Your workspace needs a desk and a chair before you can confirm a rental."}
            </p>
          </div>
        </div>
        {workspace.storageNotice && <StorageNotice message={workspace.storageNotice} onDismiss={workspace.dismissNotice} />}
        <div className="summary-grid grid grid-cols-[minmax(0,1.2fr)_minmax(390px,1fr)] items-start gap-8 max-wide:grid-cols-[minmax(0,1fr)_minmax(365px,1fr)] max-wide:gap-[22px] max-stacked:grid-cols-1 max-stacked:gap-[25px]">
          <div className="summary-preview-column min-w-0">
            <WorkspacePreview config={config} hydrated={workspace.hydrated} variant="summary" />
            <div className="summary-preview-note mx-1 mt-[23px] flex items-center gap-[15px] text-[#6b7862] max-stacked:hidden">
              <span className="text-[31px] text-green" aria-hidden="true">✳</span>
              <p className="text-[13px] leading-[1.85]">A desk, a chair, a little personality.<br /><strong className="font-medium text-foreground">A space to do your best work.</strong></p>
            </div>
          </div>
          <section className={"rental-card min-w-0 rounded-[13px] border bg-[#fdfcf8] p-[26px] max-wide:p-[23px] max-phone:px-4 max-phone:pt-5 max-phone:pb-[14px] " + (confirmed ? "rental-card-confirmed border-[#aebf9e]" : "border-[#dce1d2]")} aria-labelledby="rental-card-title" aria-busy={!workspace.hydrated}>
            <div className="rental-card-heading flex items-start justify-between gap-4 max-wide:flex-col max-wide:gap-3 max-stacked:flex-row max-phone:flex-col max-phone:gap-[11px]">
              <div>
                <p className="eyebrow mb-[11px] text-[12px] font-semibold tracking-[1.5px] text-green uppercase">{confirmed ? "Your demo request" : "Your selected pieces"}</p>
                <h2 className="font-display text-[27px] leading-[1.2] font-normal tracking-[-.6px] max-phone:text-[25px]" id="rental-card-title">{confirmed ? "Setup confirmed." : "A workspace of your own."}</h2>
              </div>
              <span className="rental-card-label rounded-sm border border-[#dce2d1] bg-[#edf1e5] px-2 py-1.5 text-[12px] whitespace-nowrap text-[#526447]">{confirmed ? "Confirmed · demo" : "Demo pricing"}</span>
            </div>
            {confirmed && (
              <div className="rental-reference mt-[19px] flex items-center justify-between gap-3 rounded-md border border-dashed border-[#bfd0ad] bg-[#eef2e6] p-[13px]">
                <span className="text-[13px] text-muted">Demo reference</span>
                <strong className="text-[13px] leading-normal font-semibold tracking-[.8px] text-green">{request?.reference}</strong>
              </div>
            )}
            {!workspace.hydrated ? (
              <p className="rental-empty px-[15px] py-[30px] text-center text-sm leading-[1.8] text-muted" role="status">Loading your saved selections…</p>
            ) : setup.lines.length ? (
              <ul className="rental-items mt-[22px] list-none" aria-label="Selected rental items">
                {setup.lines.map(({ product, quantity, productId }) => (
                  <li className="grid grid-cols-[62px_minmax(0,1fr)_auto] items-center gap-3 border-t border-[#e6e7df] py-3 max-phone:grid-cols-[47px_minmax(0,1fr)_auto] max-phone:gap-[9px]" key={productId} data-product-id={productId}>
                    <div className="rental-item-art grid h-14 place-items-center rounded-md bg-[#eef1e6] max-phone:h-[47px]"><ProductThumbnail product={product} className="h-12 w-[62px] max-phone:h-10 max-phone:w-[47px]" /></div>
                    <div className="rental-item-copy">
                      <h3 className="mb-[5px] text-[13px] leading-normal font-[550] max-phone:text-[13px]">{product.name}</h3>
                      <p className="text-[12px] leading-[1.7] text-muted max-phone:text-[12px]">Qty {quantity} · {formatIdr(product.monthlyPriceIdr)} / month</p>
                    </div>
                    <strong className="rental-line-total text-[13px] leading-normal font-[550] whitespace-nowrap max-phone:text-[13px]">{formatIdr(product.monthlyPriceIdr * quantity)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rental-empty px-[15px] py-[30px] text-center text-sm leading-[1.8] text-muted"><span className="font-display text-[35px] text-green" aria-hidden="true">+</span><p className="mt-2">No pieces selected yet.<br />Let’s give your ideas a little room.</p></div>
            )}
            <div className="rental-summary-details mt-[15px] border-t border-line">
              <div className="flex items-center justify-between gap-[15px] pt-[17px] text-[13px] leading-normal max-phone:text-[13px]"><span className="text-muted">Rental duration</span><strong className="font-[550]">{config.rentalMonths} {config.rentalMonths === 1 ? "month" : "months"}</strong></div>
              <div className="flex items-center justify-between gap-[15px] pt-[17px] text-[13px] leading-normal max-phone:text-[13px]"><span className="text-muted">Monthly equipment rental</span><strong className="summary-monthly-total font-[550]">{workspace.hydrated ? formatIdr(setup.monthlyTotal) : "—"}</strong></div>
              <div className="rental-grand-total mt-[18px] flex items-start justify-between gap-[15px] border-t border-dashed border-[#cfd6c4] pt-[18px] text-[13px] leading-normal max-phone:flex-wrap max-phone:text-[13px]">
                <div className="flex flex-col gap-1.5"><span>Estimated equipment rental</span><small className="text-[12px] text-muted">For the full {config.rentalMonths}-month period</small></div>
                <strong className="summary-period-total text-[clamp(21px,2vw,27px)] leading-[1.2] font-[550] tracking-[-.7px] whitespace-nowrap text-green max-stacked:text-[28px] max-phone:text-[27px]">{workspace.hydrated ? formatIdr(setup.periodEstimate) : "—"}</strong>
              </div>
            </div>
            <p className="rental-exclusions mt-4 text-[12px] leading-[1.7] text-muted">Delivery, deposit, and any applicable taxes are excluded.</p>
            <div className="rental-actions mt-[22px] flex flex-col items-stretch border-t border-[#e2e5d8] pt-[17px]">
              <p className="rental-demo-note mb-[14px] text-[13px] leading-[1.8] text-muted">{confirmed ? "This confirmation records your selections for the demo. It does not reserve equipment or arrange delivery." : "Demo rental only. No order or payment will be sent."}</p>
              {confirmed ? (
                <>
                  <Link href="/builder" className={primaryButtonStyles("rental")} onClick={rental.editSetup}>Back to Builder<ArrowIcon /></Link>
                  <Link href="/" className="rental-secondary-link mt-1.5 inline-flex min-h-11 items-center justify-center text-[13px] leading-normal text-green underline underline-offset-4">Back to home</Link>
                </>
              ) : (
                <>
                  <button type="button" className={primaryButtonStyles("rental") + " rent-setup-button"} disabled={!rental.canSubmit} onClick={rental.submitRental}>Rent This Setup<ArrowIcon /></button>
                  <Link href="/builder" className="rental-secondary-link mt-1.5 inline-flex min-h-11 items-center justify-center text-[13px] leading-normal text-green underline underline-offset-4" onClick={rental.editSetup}>{setup.isComplete ? "Edit Setup" : "Complete Your Setup"}</Link>
                </>
              )}
            </div>
          </section>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{confirmed ? "Demo request " + request?.reference + " created. No order has been sent." : ""}</p>
      </main>
      <footer className="summary-footer mt-[42px] flex min-h-[78px] items-center justify-between gap-5 border-t border-line text-[13px] text-muted max-phone:mt-[29px] max-phone:min-h-[73px]"><span className="font-display text-[15px] text-green">Lil Workspace</span><p>Small footprint. Big ideas.</p></footer>
    </div>
  );
}
