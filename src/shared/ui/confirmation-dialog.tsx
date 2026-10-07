"use client";

import { useEffect, useRef } from "react";

export function ConfirmationDialog({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    else if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <dialog className="confirmation-dialog" ref={ref} aria-labelledby="reset-title" aria-describedby="reset-description" onCancel={onClose} onClose={onClose}>
      <form method="dialog" onSubmit={(event) => event.preventDefault()}>
        <p className="eyebrow">A fresh start</p><h2 id="reset-title">Clear your workspace?</h2>
        <p id="reset-description">Your furniture, accessories, and rental duration will be reset. You can start building again right away.</p>
        <div className="dialog-actions"><button type="button" className="secondary-button" autoFocus onClick={onClose}>Keep my setup</button><button type="button" className="primary-button" onClick={onConfirm}>Reset setup</button></div>
      </form>
    </dialog>
  );
}
