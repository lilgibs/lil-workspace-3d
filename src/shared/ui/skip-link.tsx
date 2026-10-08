import type { ReactNode } from "react";

export function SkipLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="skip-link fixed top-4 left-4 z-10 -translate-y-[180%] rounded-md bg-foreground px-5 py-3 text-white focus:translate-y-0" href={href}>{children}</a>;
}
