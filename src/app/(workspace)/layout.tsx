import type { ReactNode } from "react";
import { WorkspaceProvider } from "@/_app/workspace-provider";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <WorkspaceProvider>{children}</WorkspaceProvider>;
}
