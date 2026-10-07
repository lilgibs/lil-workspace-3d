"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatIdr, ProductThumbnail } from "@/entities/product";
import { projectWorkspace, useWorkspaceViewModel } from "@/features/configure-workspace";
import { useRentalViewModel } from "@/features/submit-rental";
import { WorkspacePreview } from "@/widgets/workspace-preview";
import { BrandLink } from "@/shared/ui/brand-link";
import { CreatorSignature } from "@/shared/ui/creator-credit";
import { ArrowIcon } from "@/shared/ui/arrow-icon";

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
    <div className="summary-shell">
      <a className="skip-link" href="#summary-main">Skip to summary</a>
      <header className="builder-header"><BrandLink /><CreatorSignature /></header>
      <nav className="rental-steps" aria-label="Rental progress"><Link href="/builder" onClick={rental.editSetup}><span>01</span> Build</Link><span aria-current={!confirmed ? "step" : undefined} className={!confirmed ? "current-step" : ""}><span>02</span> Review</span><span aria-current={confirmed ? "step" : undefined} className={confirmed ? "current-step" : ""}><span>03</span> Ready</span></nav>
      <main id="summary-main" tabIndex={-1} data-hydrated={workspace.hydrated}>
        <div className={`summary-heading${confirmed ? " is-confirmed" : ""}`}>
          {confirmed && <span className="rental-seal" aria-hidden="true">✓</span>}
          <div><p className="eyebrow">{confirmed ? "A good place to begin" : "The finishing touches"}</p><h1 ref={heading} tabIndex={-1}>{confirmed ? <>A little space. <em>All yours.</em></> : <>One last look. <em>Make it yours.</em></>}</h1><p className="summary-description">{!workspace.hydrated ? "Restoring your workspace before we review it…" : confirmed ? "Demo request created. No order has been sent and no payment has been taken." : setup.isComplete ? "Your pieces, your pace. Check the details before confirming your rental." : "Your workspace needs a desk and a chair before you can confirm a rental."}</p></div>
        </div>
        {workspace.storageNotice && <div className="storage-notice" role="status"><p>{workspace.storageNotice}</p><button type="button" aria-label="Dismiss storage notice" onClick={workspace.dismissNotice}>×</button></div>}
        <div className="summary-grid">
          <div className="summary-preview-column"><WorkspacePreview config={config} hydrated={workspace.hydrated} /><div className="summary-preview-note"><span aria-hidden="true">✳</span><p>A desk, a chair, a little personality.<br /><strong>A space to do your best work.</strong></p></div></div>
          <section className={`rental-card${confirmed ? " rental-card-confirmed" : ""}`} aria-labelledby="rental-card-title" aria-busy={!workspace.hydrated}>
            <div className="rental-card-heading"><div><p className="eyebrow">{confirmed ? "Your demo request" : "Your selected pieces"}</p><h2 id="rental-card-title">{confirmed ? "Setup confirmed." : "A workspace of your own."}</h2></div><span className="rental-card-label">{confirmed ? "Confirmed · demo" : "Demo pricing"}</span></div>
            {confirmed && <div className="rental-reference"><span>Demo reference</span><strong>{request?.reference}</strong></div>}
            {!workspace.hydrated ? <p className="rental-empty" role="status">Loading your saved selections…</p> : setup.lines.length ? <ul className="rental-items" aria-label="Selected rental items">{setup.lines.map(({ product, quantity, productId }) => <li key={productId} data-product-id={productId}><div className="rental-item-art"><ProductThumbnail product={product} /></div><div className="rental-item-copy"><h3>{product.name}</h3><p>Qty {quantity} · {formatIdr(product.monthlyPriceIdr)} / month</p></div><strong className="rental-line-total">{formatIdr(product.monthlyPriceIdr * quantity)}</strong></li>)}</ul> : <div className="rental-empty"><span aria-hidden="true">+</span><p>No pieces selected yet.<br />Let’s give your ideas a little room.</p></div>}
            <div className="rental-summary-details"><div><span>Rental duration</span><strong>{config.rentalMonths} {config.rentalMonths === 1 ? "month" : "months"}</strong></div><div><span>Monthly equipment rental</span><strong className="summary-monthly-total">{workspace.hydrated ? formatIdr(setup.monthlyTotal) : "—"}</strong></div><div className="rental-grand-total"><div><span>Estimated equipment rental</span><small>For the full {config.rentalMonths}-month period</small></div><strong className="summary-period-total">{workspace.hydrated ? formatIdr(setup.periodEstimate) : "—"}</strong></div></div>
            <p className="rental-exclusions">Delivery, deposit, and any applicable taxes are excluded.</p>
            <div className="rental-actions">{confirmed ? <><p className="rental-demo-note">This confirmation records your selections for the demo. It does not reserve equipment or arrange delivery.</p><Link href="/builder" className="primary-button" onClick={rental.editSetup}>Back to Builder<ArrowIcon /></Link><Link href="/" className="rental-secondary-link">Back to home</Link></> : <><p className="rental-demo-note">Demo rental only. No order or payment will be sent.</p><button type="button" className="primary-button rent-setup-button" disabled={!rental.canSubmit} onClick={rental.submitRental}>Rent This Setup<ArrowIcon /></button><Link href="/builder" className="rental-secondary-link" onClick={rental.editSetup}>{setup.isComplete ? "Edit Setup" : "Complete Your Setup"}</Link></>}</div>
          </section>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{confirmed ? `Demo request ${request?.reference} created. No order has been sent.` : ""}</p>
      </main>
      <footer className="summary-footer"><span>Lil Workspace</span><p>Small footprint. Big ideas.</p></footer>
    </div>
  );
}
