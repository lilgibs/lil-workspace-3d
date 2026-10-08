export function StorageNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="storage-notice mb-[15px] flex items-center justify-between rounded-[7px] border border-[#dbe1ce] bg-[#eef0e3] px-[14px] py-[5px] text-[#56624e]" role="status">
      <p className="text-xs leading-[1.7]">{message}</p>
      <button type="button" className="min-h-11 min-w-11 cursor-pointer border-0 bg-transparent text-[21px]" aria-label="Dismiss storage notice" onClick={onDismiss}>×</button>
    </div>
  );
}
