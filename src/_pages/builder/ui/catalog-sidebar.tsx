"use client";

import type { useWorkspaceViewModel } from "@/features/configure-workspace";
import { CatalogPanel } from "@/widgets/catalog-panel";
import { primaryButtonStyles } from "@/shared/ui/button-styles";

type Props = { model: ReturnType<typeof useWorkspaceViewModel>; open: boolean; onClose: () => void };

// Desktop: a viewport-high column the page can hide. Below lg: a full-height drawer from the right.
// The close button rides on the panel's own heading row, so it never covers the scrolling catalog.
export function CatalogSidebar({ model, open, onClose }: Props) {
  const close = (
    <button type="button" className="catalog-close grid size-11 shrink-0 cursor-pointer place-items-center rounded-[7px] border border-line bg-[#fcfbf7] text-muted hover:text-green lg:hidden" aria-label="Hide catalog" onClick={onClose}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
    </button>
  );
  return (
    <>
      {open && <button type="button" className="catalog-backdrop fixed inset-0 z-[7] cursor-pointer border-0 bg-[#20272366] p-0 lg:hidden" aria-label="Hide catalog" onClick={onClose} />}
      <div id="catalog-sidebar" inert={!open} data-open={open || undefined} className={"catalog-sidebar flex min-h-0 flex-col max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-[8] max-lg:w-[min(420px,86vw)] max-lg:border-l max-lg:border-line max-lg:bg-[#fcfbf7] max-lg:shadow-[-12px_0_32px_#20272320] max-lg:transition-transform max-lg:duration-300 motion-reduce:transition-none max-lg:[&>section]:rounded-none max-lg:[&>section]:border-0 " + (open ? "" : "lg:hidden max-lg:translate-x-full")}>
        <CatalogPanel model={model} action={close} />
        <div className="catalog-sidebar-footer shrink-0 border-t border-line bg-[#f7f4ed] px-[22px] pt-3 pb-[calc(12px_+_env(safe-area-inset-bottom))] lg:hidden max-phone:px-[15px]">
          <button type="button" className={primaryButtonStyles("compact") + " w-full"} onClick={onClose}>Done</button>
        </div>
      </div>
    </>
  );
}
