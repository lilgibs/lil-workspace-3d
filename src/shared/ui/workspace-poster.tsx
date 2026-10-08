import Image from "next/image";
import workspaceHero from "../../../public/lil-workspace-hero.webp";

export function WorkspacePoster() {
  return (
    <Image
      src={workspaceHero}
      alt="A cozy workspace with a wooden desk, green chair, monitor, task lamp, and plant."
      className="workspace-poster block h-auto w-full"
      sizes="(max-width: 540px) calc(100vw - 44px), (max-width: 850px) 510px, (max-width: 1439px) 50vw, 610px"
      preload
    />
  );
}
