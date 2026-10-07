import Link from "next/link";
import { BRANDING } from "@/shared/config/branding";

export function BrandLink() {
  return (
    <Link className="brand-link" href="/" aria-label={`${BRANDING.productName} home`}>
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="m5 12 11-6 11 6-11 6-11-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M5 12v12m22-12v12M16 18v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      <span>{BRANDING.productName}<span className="brand-period">.</span></span>
    </Link>
  );
}
