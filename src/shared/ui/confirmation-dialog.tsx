"use client";

import { useEffect, useRef } from "react";
import { primaryButtonStyles, secondaryButtonStyles } from "./button-styles";

export function ConfirmationDialog({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    else if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <dialog
      className="confirmation-dialog m-auto w-[calc(100%_-_36px)] max-w-[430px] rounded-[14px] border border-[#d6dccb] bg-background p-[30px] text-foreground shadow-[0_20px_100px_#26332333] backdrop:bg-[#20272370] backdrop:backdrop-blur-[3px] max-phone:p-6"
      ref={ref} aria-labelledby="reset-title" aria-describedby="reset-description" onCancel={onClose} onClose={onClose}
    >
      <form method="dialog" onSubmit={(event) => event.preventDefault()}>
        <p className="eyebrow mb-[14px] text-[10px] font-semibold tracking-[1.8px] text-green uppercase">A fresh start</p>
        <h2 className="font-display text-[30px] leading-[1.2] font-normal tracking-[-.8px]" id="reset-title">Clear your workspace?</h2>
        <p className="mt-4 mb-[25px] text-[13px] leading-[1.8] text-muted" id="reset-description">Your furniture, accessories, and rental duration will be reset. You can start building again right away.</p>
        <div className="dialog-actions flex justify-end gap-2.5 max-phone:justify-stretch">
          <button type="button" className={secondaryButtonStyles + " max-phone:flex-1"} autoFocus onClick={onClose}>Keep my setup</button>
          <button type="button" className={primaryButtonStyles("compact") + " max-phone:flex-1"} onClick={onConfirm}>Reset setup</button>
        </div>
      </form>
    </dialog>
  );
}
