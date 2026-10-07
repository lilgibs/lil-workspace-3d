import Link from "next/link";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { BrandLink } from "@/shared/ui/brand-link";
import { CreatorCredit } from "@/shared/ui/creator-credit";

export default function BuilderPage() {
  return (
    <div className="splash-shell placeholder-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header"><BrandLink /></header>
      <main id="main" tabIndex={-1} className="builder-placeholder">
        <span className="placeholder-symbol" aria-hidden="true">✳</span>
        <p className="eyebrow">A little room for what&apos;s next</p>
        <h1>Your workspace<br /><em>is on its way.</em></h1>
        <p className="hero-description">The interactive builder is coming next. Soon, you&apos;ll be able to pick your pieces and bring your setup to life.</p>
        <Link className="primary-button" href="/"><ArrowIcon back />Back to home</Link>
      </main>
      <CreatorCredit />
    </div>
  );
}
