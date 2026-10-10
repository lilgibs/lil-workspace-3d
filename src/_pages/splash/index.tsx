import Link from "next/link";
import { BRANDING } from "@/shared/config/branding";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { BrandLink } from "@/shared/ui/brand-link";
import { CreatorCredit } from "@/shared/ui/creator-credit";
import { WorkspacePoster } from "@/shared/ui/workspace-poster";
import { primaryButtonStyles } from "@/shared/ui/button-styles";
import { SkipLink } from "@/shared/ui/skip-link";

const steps = [
  { number: "01", title: "Pick your pieces", description: "A desk, a chair, a few good extras." },
  { number: "02", title: "Make it yours", description: "See your workspace come together." },
  { number: "03", title: "Review your setup", description: "Your next workday starts here." },
];

export function SplashPage() {
  return (
    <div className="splash-shell mx-auto max-w-[1440px] px-16 max-wide:px-10 max-stacked:px-8 max-phone:px-[22px]">
      <SkipLink href="#main">Skip to content</SkipLink>
      <header className="site-header flex min-h-[108px] items-center justify-between gap-6 border-b border-line max-stacked:min-h-[90px] max-phone:min-h-[79px] max-phone:gap-3">
        <BrandLink />
      </header>
      <main id="main" tabIndex={-1}>
        <section className="splash-hero grid min-h-[615px] grid-cols-[1fr_1.1fr] items-center gap-7 pt-12 pb-9 cinema:min-h-[622px] max-wide:min-h-[540px] max-wide:gap-4 max-stacked:grid-cols-1 max-stacked:gap-[30px] max-stacked:pt-[54px] max-phone:gap-9 max-phone:pt-[42px]" aria-labelledby="hero-title">
          <div className="hero-copy pb-8 motion-safe:animate-entrance max-stacked:pb-0">
            <p className="eyebrow mb-7 flex items-center gap-2.5 text-[12px] font-semibold tracking-[1.8px] uppercase max-phone:mb-[21px] max-phone:gap-2 max-phone:text-[12px] max-phone:tracking-[1.1px]">
              <span className="inline-block h-px w-[23px] bg-green max-phone:w-4" aria-hidden="true" />{BRANDING.description}
            </p>
            <h1 className="font-display text-[clamp(58px,5.5vw,80px)] leading-[1.06] font-normal tracking-[-4px] max-wide:text-[60px] max-wide:tracking-[-3px] max-stacked:text-[clamp(54px,8.5vw,72px)] max-phone:text-[clamp(47px,10.9vw,58px)] max-phone:leading-[1.09] max-phone:tracking-[-2.6px]" id="hero-title">
              Your workspace,<br /><em className="font-normal text-green">your way.</em>
            </h1>
            <p className="hero-description mt-[25px] mb-[29px] max-w-[345px] text-[15px] leading-[1.85] text-muted max-stacked:mt-5 max-stacked:mb-[25px] max-stacked:max-w-[420px] max-phone:max-w-[330px] max-phone:text-sm max-phone:leading-[1.8]">
              Build your ideal workspace. Pick your furniture, see your setup, and review your rental.
            </p>
            <Link className={primaryButtonStyles("hero")} href="/builder">Start Building<ArrowIcon /></Link>
            <p className="cta-note mt-[13px] text-[13px] text-muted">A little space for your next big idea.</p>
          </div>
          <div className="poster-composition relative min-w-0 motion-safe:animate-entrance motion-safe:[animation-delay:80ms] cinema:w-full cinema:max-w-[610px] cinema:justify-self-end max-stacked:w-full max-stacked:max-w-[510px] max-stacked:justify-self-center">
            <div className="poster-heading flex items-center justify-between px-[14px] pb-2.5 text-muted max-phone:px-0 max-phone:pb-[13px]">
              <span className="eyebrow text-[12px] font-semibold tracking-[1.3px] uppercase max-phone:text-[12px] max-phone:tracking-[1px]">The possibilities start here</span>
              <span className="poster-number font-display text-lg leading-normal text-[#8c9783]" aria-hidden="true">01 /</span>
            </div>
            <div className="poster-stage relative rounded-[50%_50%_12px_12px] bg-[radial-gradient(ellipse_at_50%_55%,#e8ecdc_0%,#edf0e2_43%,transparent_70%)]"><WorkspacePoster /></div>
            <div className="poster-caption mx-[14px] -mt-2.5 flex items-center gap-[15px] text-[13px] leading-[1.7] text-muted max-phone:m-0 max-phone:gap-2.5 max-phone:text-[12px]">
              <span className="caption-line h-px w-[34px] bg-[#a4ad94] max-phone:w-6" aria-hidden="true" />
              <span>Small footprint.<br /><strong className="font-medium text-foreground">Big main-character energy.</strong></span>
              <span className="sun-symbol ml-auto text-[33px] leading-none text-green max-phone:text-[27px]" aria-hidden="true">✳</span>
            </div>
          </div>
        </section>
        <ol className="how-it-works grid list-none grid-cols-3 border-y border-line pt-7 pb-[30px] motion-safe:animate-entrance motion-safe:[animation-delay:160ms] max-phone:grid-cols-1 max-phone:gap-[22px] max-phone:py-[23px]" aria-label="How it works">
          {steps.map((step) => (
            <li className="flex items-start gap-4 border-l border-line px-[30px] first:border-l-0 first:pl-0 last:pr-0 max-wide:gap-3 max-wide:px-5 max-stacked:gap-2.5 max-stacked:px-[14px] max-phone:gap-[17px] max-phone:border-0 max-phone:px-0" key={step.number}>
              <span className="step-number mt-0.5 font-display text-[17px] text-green">{step.number}</span>
              <div>
                <h2 className="mb-1.5 text-sm leading-normal font-semibold max-stacked:text-[13px] max-phone:mb-[3px] max-phone:text-sm">{step.title}</h2>
                <p className="text-[13px] leading-[1.7] text-muted max-phone:text-[13px]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <CreatorCredit />
    </div>
  );
}
