import Link from "next/link";
import { BRANDING } from "@/shared/config/branding";

export function BrandLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={"brand-link inline-flex min-h-11 items-center gap-3 text-[22px] leading-normal font-[650] tracking-[-1px] whitespace-nowrap text-foreground no-underline max-phone:gap-2 max-phone:text-lg max-phone:tracking-[-.8px] " + (compact ? "max-phone:min-h-[35px]" : "")}
      href="/"
      aria-label={BRANDING.productName + " home"}
    >
      <span className="brand-symbol grid size-[42px] place-items-center rounded-xl bg-[#e8ecdf] text-green max-phone:size-[33px] max-phone:rounded-[9px]" aria-hidden="true">
        <svg className="size-[31px] max-phone:size-[25px]" viewBox="0 0 32 32" fill="none">
          <path d="m5 12 11-6 11 6-11 6-11-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M5 12v12m22-12v12M16 18v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      <span>{BRANDING.productName}<span className="brand-period text-green">.</span></span>
    </Link>
  );
}
