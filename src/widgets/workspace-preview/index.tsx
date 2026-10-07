"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type ReactNode } from "react";
import type { WorkspaceConfig } from "@/entities/workspace";
import type { CameraView } from "./ui/workspace-scene";

const WorkspaceScene = dynamic(() => import("./ui/workspace-scene"), { ssr: false, loading: () => <div className="preview-loading"><span className="loading-orbit" aria-hidden="true" /><p>Making a little room for you…</p></div> });

class PreviewBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onError: () => void }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

export function WorkspacePreview({ config, hydrated }: { config: WorkspaceConfig; hydrated: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [view, setView] = useState<CameraView>({ angle: "angle", revision: 0 });
  const onReady = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("error"), []);
  const retry = () => { setStatus("loading"); setAttempt((value) => value + 1); };
  const failure = <div className="preview-error" role="status"><span aria-hidden="true">↺</span><h3>3D preview is unavailable</h3><p>Your setup is safe. You can keep choosing your pieces and try the preview again.</p><button type="button" className="secondary-button" onClick={retry}>Retry Preview</button></div>;

  return (
    <section className="workspace-preview" aria-label="Your workspace preview" data-preview-status={status}>
      <div className="preview-heading"><span className="eyebrow">Your little corner</span><span className="preview-item-count">{!hydrated ? "Loading setup" : status === "error" ? "Preview unavailable" : status === "ready" ? "Live preview" : "Loading preview"}</span></div>
      <div className="preview-canvas">
        {!hydrated ? <div className="preview-loading"><span className="loading-orbit" aria-hidden="true" /><p>Restoring your workspace…</p></div> : status === "error" ? failure : <PreviewBoundary key={attempt} fallback={failure} onError={onError}><WorkspaceScene config={config} view={view} onReady={onReady} onError={onError} /></PreviewBoundary>}
        {hydrated && status === "ready" && !config.deskId && <div className="empty-preview-hint"><span aria-hidden="true">+</span><p>Pick a desk to get started</p></div>}
      </div>
      <div className="preview-bottom"><p>{status === "error" ? "Your selections are still available." : "A few good pieces. A space of your own."}</p><div className="view-controls" role="group" aria-label="Camera views"><button type="button" aria-label="Angled view" aria-pressed={view.angle === "angle"} disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "angle", revision: current.revision + 1 }))}>Angle</button><button type="button" aria-label="Front view" aria-pressed={view.angle === "front"} disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "front", revision: current.revision + 1 }))}>Front</button><button type="button" aria-label="Reset view" disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "angle", revision: current.revision + 1 }))}>↺<span className="sr-only">Reset view</span></button></div></div>
    </section>
  );
}
