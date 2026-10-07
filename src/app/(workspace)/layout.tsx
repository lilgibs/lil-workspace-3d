import type { ReactNode } from "react";
import { WorkspaceProvider } from "@/_app/workspace-provider";
import "./builder/builder.css";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <WorkspaceProvider>{children}</WorkspaceProvider>;
}
