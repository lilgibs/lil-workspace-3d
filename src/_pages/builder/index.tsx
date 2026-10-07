"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatIdr } from "@/entities/product";
import { useWorkspaceViewModel } from "@/features/configure-workspace";
import { CatalogPanel } from "@/widgets/catalog-panel";
import { WorkspacePreview } from "@/widgets/workspace-preview";
import { BrandLink } from "@/shared/ui/brand-link";
import { CreatorSignature } from "@/shared/ui/creator-credit";
import { ConfirmationDialog } from "@/shared/ui/confirmation-dialog";
import { ArrowIcon } from "@/shared/ui/arrow-icon";

function BuilderContent() {
  const model = useWorkspaceViewModel();
  const router = useRouter();
  const [resetOpen, setResetOpen] = useState(false);
  return (
    <div className="builder-shell">
      <a className="skip-link" href="#builder-main">Skip to builder</a>
      <header className="builder-header"><BrandLink /><CreatorSignature /></header>
      <div className="builder-heading"><div><Link href="/" className="back-link"><ArrowIcon back />Back to home</Link><h1>A space that feels <em>like you.</em></h1></div><button type="button" className="reset-setup-button" aria-label="Reset setup" disabled={!model.hydrated || (model.itemCount === 0 && model.config.rentalMonths === 1)} onClick={() => setResetOpen(true)}><span aria-hidden="true">↺</span>Reset setup</button></div>
      {model.storageNotice && <div className="storage-notice" role="status"><p>{model.storageNotice}</p><button type="button" aria-label="Dismiss storage notice" onClick={model.dismissNotice}>×</button></div>}
      <main id="builder-main" tabIndex={-1} className="builder-main" data-hydrated={model.hydrated}>
        <CatalogPanel model={model} />
        <div className="builder-preview-column">
          <WorkspacePreview config={model.config} hydrated={model.hydrated} />
          <div className="workspace-inventory" aria-label="Selected workspace items"><span className="eyebrow">In your workspace</span>{model.hydrated && model.lines.length ? <ul>{model.lines.map((line) => <li key={line.productId}>{line.product.name}{line.quantity > 1 && <span> × {line.quantity}</span>}</li>)}</ul> : <p>{model.hydrated ? "A blank canvas, waiting for you." : "Restoring your workspace…"}</p>}</div>
        </div>
      </main>
      <footer className="builder-total-bar">
        <div className="rental-duration"><label htmlFor="rental-months">Rental duration</label><select id="rental-months" value={model.config.rentalMonths} disabled={!model.hydrated} onChange={(event) => model.setRentalMonths(Number(event.target.value) as 1 | 3 | 6)}><option value={1}>1 month</option><option value={3}>3 months</option><option value={6}>6 months</option></select></div>
        <div className="rental-total"><span>Estimated monthly rental</span><p><strong>{model.hydrated ? formatIdr(model.monthlyTotal) : "—"}</strong><span> / month</span></p></div>
        <div className="rental-period"><span>{model.config.rentalMonths}-month estimate</span><strong>{model.hydrated ? formatIdr(model.periodEstimate) : "—"}</strong><p>Equipment only. Delivery, deposit, and taxes excluded.</p></div>
        <div className="builder-checkout"><div id="setup-readiness" className={`setup-readiness${model.isComplete ? " is-ready" : ""}`} aria-live="polite"><span aria-hidden="true">{model.isComplete ? "✓" : "○"}</span>{!model.hydrated ? "Restoring setup" : model.isComplete ? "Your setup is ready" : !model.desk ? "Start with a desk" : "Pick a chair next"}</div><button type="button" className="primary-button review-button" disabled={!model.hydrated || !model.isComplete} aria-describedby="setup-readiness" onClick={() => router.push("/summary")}>Review Setup<ArrowIcon /></button></div>
      </footer>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{model.announcement} {model.hydrated ? `${model.itemCount} items selected. Estimated monthly rental ${model.monthlyTotal} rupiah.` : ""}</span>
      <ConfirmationDialog open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { model.resetSetup(); setResetOpen(false); }} />
    </div>
  );
}

export const BuilderPage = BuilderContent;
