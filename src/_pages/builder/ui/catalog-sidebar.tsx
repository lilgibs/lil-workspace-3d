"use client";

import { formatIdr } from "@/entities/product";
import type { useWorkspaceViewModel } from "@/features/configure-workspace";
import { CatalogPanel } from "@/widgets/catalog-panel";
import { primaryButtonStyles } from "@/shared/ui/button-styles";

type Props = { model: ReturnType<typeof useWorkspaceViewModel>; open: boolean; onClose: () => void };

// Desktop: a plain column the page can hide. Below lg: a full-height overlay from the right, full width on phones.
// It covers the total bar, so it carries its own monthly total and a Done button.
export function CatalogSidebar({ model, open, onClose }: Props) {
  return (
    <>
      {open && <button type="button" className="catalog-backdrop fixed inset-0 z-[7] cursor-pointer border-0 bg-[#20272366] p-0 lg:hidden" aria-label="Hide catalog" onClick={onClose} />}
      <div id="catalog-sidebar" inert={!open} data-open={open || undefined} className={"catalog-sidebar relative max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-[8] max-lg:w-[min(420px,86vw)] max-lg:flex-col max-lg:border-l max-lg:border-line max-lg:bg-[#fcfbf7] max-lg:shadow-[-12px_0_32px_#20272320] max-lg:transition-transform max-lg:duration-300 motion-reduce:transition-none max-phone:w-full max-phone:border-l-0 " + (open ? "max-lg:flex max-lg:translate-x-0" : "hidden max-lg:flex max-lg:translate-x-full")}>
        <button type="button" className="catalog-close absolute top-3 right-3 z-[1] grid size-11 cursor-pointer place-items-center rounded-[7px] border border-line bg-[#fcfbf7] text-muted hover:text-green lg:hidden" aria-label="Hide catalog" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
        </button>
        <div className="catalog-sidebar-scroll max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:[&>section]:rounded-none max-lg:[&>section]:border-0">
          <CatalogPanel model={model} />
        </div>
        <div className="catalog-sidebar-footer hidden items-center justify-between gap-4 border-t border-line bg-[#f7f4ed] px-[22px] pt-3 pb-[calc(12px_+_env(safe-area-inset-bottom))] max-lg:flex max-phone:px-[15px]">
          <p className="text-[12px] leading-normal text-muted">Estimated monthly rental<br /><strong className="text-lg font-[550] tracking-[-.4px] text-foreground">{model.hydrated ? formatIdr(model.monthlyTotal) : "—"}</strong></p>
          <button type="button" className={primaryButtonStyles("compact")} onClick={onClose}>Done</button>
        </div>
      </div>
    </>
  );
}
