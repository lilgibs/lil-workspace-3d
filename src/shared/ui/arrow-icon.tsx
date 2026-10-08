export function ArrowIcon({ back = false, small = false }: { back?: boolean; small?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={"arrow-icon shrink-0 " + (small ? "size-4 " : "size-[22px] ") + (back ? "arrow-back rotate-180" : "")}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
