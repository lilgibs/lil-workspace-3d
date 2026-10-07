export function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={back ? "arrow-icon arrow-back" : "arrow-icon"}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
