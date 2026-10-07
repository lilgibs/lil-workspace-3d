import Link from "next/link";
import { BRANDING } from "@/shared/config/branding";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { BrandLink } from "@/shared/ui/brand-link";
import { CreatorCredit } from "@/shared/ui/creator-credit";
import { WorkspacePoster } from "@/shared/ui/workspace-poster";

export function SplashPage() {
  return (
    <div className="splash-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <BrandLink />
      </header>
      <main id="main" tabIndex={-1}>
        <section className="splash-hero" aria-labelledby="hero-title">
          <div className="hero-copy entrance">
            <p className="eyebrow"><span aria-hidden="true" />{BRANDING.description}</p>
            <h1 id="hero-title">Your workspace,<br /><em>your way.</em></h1>
            <p className="hero-description">Build your ideal workspace. Pick your furniture, see your setup, and review your rental.</p>
            <Link className="primary-button" href="/builder">Start Building<ArrowIcon /></Link>
            <p className="cta-note">A little space for your next big idea.</p>
          </div>
          <div className="poster-composition entrance">
            <div className="poster-heading"><span className="eyebrow">The possibilities start here</span><span className="poster-number" aria-hidden="true">01 /</span></div>
            <div className="poster-stage"><WorkspacePoster /></div>
            <div className="poster-caption"><span className="caption-line" aria-hidden="true" /><span>Small footprint.<br /><strong>Big main-character energy.</strong></span><span className="sun-symbol" aria-hidden="true">✳</span></div>
          </div>
        </section>
        <ol className="how-it-works entrance" aria-label="How it works">
          <li><span className="step-number">01</span><div><h2>Pick your pieces</h2><p>A desk, a chair, a few good extras.</p></div></li>
          <li><span className="step-number">02</span><div><h2>Make it yours</h2><p>See your workspace come together.</p></div></li>
          <li><span className="step-number">03</span><div><h2>Review your setup</h2><p>Your next workday starts here.</p></div></li>
        </ol>
      </main>
      <CreatorCredit />
    </div>
  );
}
