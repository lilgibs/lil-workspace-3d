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

  const secondaryLink = "rental-secondary-link inline-flex min-h-[46px] items-center justify-center rounded-[7px] border border-[#bdc9ad] bg-[#fcfbf6] px-4 text-[13px] leading-normal whitespace-nowrap text-green no-underline hover:border-[#9ba98e] max-phone:min-h-11";

  return (
    <div className="summary-shell mx-auto flex max-w-[1440px] flex-col px-10 max-wide:px-7 lg:h-dvh lg:overflow-hidden max-phone:px-[18px]">
      <SkipLink href="#summary-main">Skip to summary</SkipLink>
      <WorkspaceHeader summary />
      <nav className="rental-steps flex shrink-0 items-center gap-7 py-3 text-[13px] leading-normal text-muted max-phone:gap-5" aria-label="Rental progress">
        <Link className="inline-flex min-h-11 items-center gap-[7px] text-inherit no-underline hover:text-green" href="/builder" onClick={rental.editSetup}><span className="font-display text-[15px] text-[#748268]">01</span> Build</Link>
        <span aria-current={!confirmed ? "step" : undefined} className={"inline-flex items-center gap-[7px] " + (!confirmed ? "current-step font-semibold text-green" : "")}><span className="font-display text-[15px] text-[#748268]">02</span> Review</span>
        <span aria-current={confirmed ? "step" : undefined} className={"inline-flex items-center gap-[7px] " + (confirmed ? "current-step font-semibold text-green" : "")}><span className="font-display text-[15px] text-[#748268]">03</span> Ready</span>
      </nav>
      {workspace.storageNotice && <StorageNotice message={workspace.storageNotice} onDismiss={workspace.dismissNotice} />}
      <main id="summary-main" tabIndex={-1} className="summary-grid grid min-h-0 flex-1 grid-cols-[minmax(0,1.2fr)_minmax(390px,1fr)] items-start gap-6 pb-8 lg:items-stretch lg:pb-6 max-wide:grid-cols-[minmax(0,1fr)_minmax(365px,1fr)] max-wide:gap-[22px] max-stacked:grid-cols-1 max-stacked:gap-[25px]" data-hydrated={workspace.hydrated}>
        {/* Stays in view while the receipt scrolls; stacks above it on narrow screens. */}
        <div className="summary-preview-column min-h-0 min-w-0 stacked:sticky stacked:top-5 lg:static">
          <WorkspacePreview config={config} hydrated={workspace.hydrated} variant="summary" />
        </div>
        <section className={"rental-card flex min-h-0 min-w-0 flex-col rounded-[13px] border bg-[#fdfcf8] p-[26px] max-wide:p-[23px] max-phone:px-4 max-phone:pt-5 max-phone:pb-[14px] " + (confirmed ? "rental-card-confirmed border-[#aebf9e]" : "border-[#dce1d2]")} aria-labelledby="rental-card-title" aria-busy={!workspace.hydrated}>
          <div className="rental-card-heading flex items-start justify-between gap-4 max-phone:flex-col max-phone:gap-[11px]">
            <div className="flex items-start gap-3">
              {confirmed && <span className="rental-seal grid size-11 shrink-0 place-items-center rounded-full border border-[#b3c4a6] bg-[#e7eddc] text-xl text-green" aria-hidden="true">✓</span>}
              <div>
                <h1 className="font-display text-[27px] leading-[1.2] font-normal tracking-[-.6px] focus:outline-none max-phone:text-[25px]" id="rental-card-title" ref={heading} tabIndex={-1}>
                  {confirmed ? <>Setup <em className="font-normal text-green">confirmed.</em></> : <>One last look. <em className="font-normal text-green">Make it yours.</em></>}
                </h1>
                {(!workspace.hydrated || confirmed || !setup.isComplete) && (
                  <p className="summary-description mt-1.5 text-[13px] leading-[1.7] text-muted">
                    {!workspace.hydrated ? "Restoring your workspace before we review it…" : confirmed ? "Demo request created. No order has been sent and no payment has been taken." : "Your workspace needs a desk and a chair before you can confirm a rental."}
                  </p>
                )}
              </div>
            </div>
            <span className="rental-card-label shrink-0 rounded-sm border border-[#dce2d1] bg-[#edf1e5] px-2 py-1.5 text-[12px] whitespace-nowrap text-[#526447]">{confirmed ? "Confirmed · demo" : "Demo pricing"}</span>
          </div>
          {confirmed && (
            <div className="rental-reference mt-4 flex items-center justify-between gap-3 rounded-md border border-dashed border-[#bfd0ad] bg-[#eef2e6] p-[13px]">
              <span className="text-[13px] text-muted">Demo reference</span>
              <strong className="text-[13px] leading-normal font-semibold tracking-[.8px] text-green">{request?.reference}</strong>
            </div>
          )}
          {!workspace.hydrated ? (
            <p className="rental-empty px-[15px] py-[30px] text-center text-sm leading-[1.8] text-muted" role="status">Loading your saved selections…</p>
          ) : setup.lines.length ? (
            <ul className="rental-items mt-4 list-none lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain" aria-label="Selected rental items">
              {setup.lines.map(({ product, quantity, productId }) => (
                <li className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3 border-t border-[#e6e7df] py-2.5 max-phone:grid-cols-[47px_minmax(0,1fr)_auto] max-phone:gap-[9px]" key={productId} data-product-id={productId}>
                  <div className="rental-item-art grid h-12 place-items-center rounded-md bg-[#eef1e6] max-phone:h-[47px]"><ProductThumbnail product={product} className="h-10 w-[54px] max-phone:h-10 max-phone:w-[47px]" /></div>
                  <div className="rental-item-copy">
                    <h2 className="mb-[3px] text-[13px] leading-normal font-[550]">{product.name}</h2>
                    <p className="text-[12px] leading-[1.6] text-muted">Qty {quantity} · {formatIdr(product.monthlyPriceIdr)} / month</p>
                  </div>
                  <strong className="rental-line-total text-[13px] leading-normal font-[550] whitespace-nowrap">{formatIdr(product.monthlyPriceIdr * quantity)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rental-empty px-[15px] py-[30px] text-center text-sm leading-[1.8] text-muted"><span className="font-display text-[35px] text-green" aria-hidden="true">+</span><p className="mt-2">No pieces selected yet.<br />Let’s give your ideas a little room.</p></div>
          )}
          <div className="rental-summary-details shrink-0 border-t border-line pt-3">
            <div className="rental-grand-total flex items-end justify-between gap-[15px] max-phone:flex-wrap">
              <div className="flex flex-col gap-0.5 text-[13px] leading-normal">
                <span className="text-muted">{config.rentalMonths} {config.rentalMonths === 1 ? "month" : "months"} · <strong className="summary-monthly-total font-[550] text-foreground">{workspace.hydrated ? formatIdr(setup.monthlyTotal) : "—"}</strong> / month</span>
                <small className="text-[12px] text-muted">Estimated equipment rental for the full period</small>
              </div>
              <strong className="summary-period-total text-[clamp(21px,2vw,26px)] leading-[1.2] font-[550] tracking-[-.7px] whitespace-nowrap text-green max-phone:text-[25px]">{workspace.hydrated ? formatIdr(setup.periodEstimate) : "—"}</strong>
            </div>
          </div>
          <div className="rental-actions mt-3 flex shrink-0 items-stretch gap-2 max-phone:flex-col">
            {confirmed ? (
              <>
                <Link href="/" className={secondaryLink}>Back to home</Link>
                <Link href="/builder" className={primaryButtonStyles("review") + " flex-1"} onClick={rental.editSetup}>Back to Builder<ArrowIcon /></Link>
              </>
            ) : (
              <>
                <Link href="/builder" className={secondaryLink} onClick={rental.editSetup}>{setup.isComplete ? "Edit Setup" : "Complete Your Setup"}</Link>
                <button type="button" className={primaryButtonStyles("review") + " rent-setup-button flex-1"} disabled={!rental.canSubmit} onClick={rental.submitRental}>Rent This Setup<ArrowIcon /></button>
              </>
            )}
          </div>
        </section>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{confirmed ? "Demo request " + request?.reference + " created. No order has been sent." : ""}</p>
      </main>
    </div>
  );
}
