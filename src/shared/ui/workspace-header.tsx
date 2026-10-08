import { BrandLink } from "./brand-link";
import { CreatorSignature } from "./creator-credit";

export function WorkspaceHeader({ summary = false }: { summary?: boolean }) {
  return (
    <header className={"builder-header flex min-h-[82px] items-center justify-between gap-6 border-b border-line max-lg:min-h-20 max-phone:min-h-[95px] max-phone:flex-col max-phone:items-start max-phone:justify-center " + (summary ? "max-phone:gap-2 max-phone:py-[14px]" : "max-phone:gap-[7px] max-phone:pt-[15px] max-phone:pb-3")}>
      <BrandLink compact />
      <CreatorSignature compact />
    </header>
  );
}
