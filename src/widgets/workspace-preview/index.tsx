"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type ReactNode } from "react";
import type { WorkspaceConfig } from "@/entities/workspace";
import type { CameraView } from "./ui/workspace-scene";
import { secondaryButtonStyles } from "@/shared/ui/button-styles";

function PreviewLoading({ message }: { message: string }) {
  return (
    <div className="preview-loading absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <span className="loading-orbit size-8 rounded-full border-2 border-[#d4ddc5] border-t-green motion-safe:animate-loading" aria-hidden="true" />
      <p className="max-w-[290px] text-[13px] leading-[1.8] text-muted">{message}</p>
    </div>
  );
}

const WorkspaceScene = dynamic(() => import("./ui/workspace-scene"), {
  ssr: false,
  loading: () => <PreviewLoading message="Making a little room for you…" />,
});

class PreviewBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onError: () => void }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

export function WorkspacePreview({ config, hydrated, variant = "builder" }: { config: WorkspaceConfig; hydrated: boolean; variant?: "builder" | "summary" }) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [view, setView] = useState<CameraView>({ angle: "angle", revision: 0 });
  const onReady = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("error"), []);
  const retry = () => { setStatus("loading"); setAttempt((value) => value + 1); };
  const canvasHeight = variant === "summary"
    ? "h-[clamp(350px,36vw,490px)] max-stacked:h-[clamp(290px,40svh,420px)] max-phone:h-[clamp(250px,34svh,310px)]"
    : "h-[485px] max-catalog:h-[450px] max-lg:h-[clamp(275px,37svh,405px)] max-phone:h-[clamp(245px,34svh,305px)] [@media(max-height:550px)_and_(max-width:1023px)]:h-[300px]";
  const footerLayout = variant === "summary"
    ? "items-center max-wide:flex-col max-stacked:flex-row max-phone:flex-col"
    : "items-center max-catalog:items-start max-phone:flex-col max-phone:items-center";
  const viewButtonStyles = "min-h-11 cursor-pointer border-0 border-l border-[#e1e6d5] bg-transparent px-[9px] text-muted first:border-l-0 aria-pressed:bg-[#e5ecd9] aria-pressed:text-green disabled:cursor-not-allowed " + (variant === "summary" ? "disabled:opacity-50" : "disabled:opacity-[.48]");
  const failure = (
    <div className="preview-error absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center max-phone:gap-3" role="status">
      <span className="text-[34px] text-green" aria-hidden="true">↺</span>
      <h3 className="font-display text-[26px] font-normal max-phone:text-[21px]">3D preview is unavailable</h3>
      <p className="max-w-[290px] text-[13px] leading-[1.8] text-muted max-phone:text-[13px]">Your setup is safe. You can keep choosing your pieces and try the preview again.</p>
      <button type="button" className={secondaryButtonStyles} onClick={retry}>Retry Preview</button>
    </div>
  );

  return (
    <section className="workspace-preview overflow-hidden rounded-[13px] border border-[#e0e3d6] bg-[#edf0e3]" aria-label="Your workspace preview" data-preview-status={status}>
      <div className="preview-heading flex items-center justify-between gap-[15px] px-[25px] pt-[23px] max-phone:px-[15px] max-phone:pt-[17px]">
        <span className="eyebrow text-[12px] font-semibold tracking-[1.5px] text-[#59694c] uppercase max-phone:text-[12px] max-phone:tracking-[1.1px]">Your little corner</span>
        <span className="preview-item-count text-[12px] text-[#67765b] max-phone:text-[12px]">{!hydrated ? "Loading setup" : status === "error" ? "Preview unavailable" : status === "ready" ? "Live preview" : "Loading preview"}</span>
      </div>
      <div className={"preview-canvas relative w-full bg-[radial-gradient(ellipse_at_50%_70%,#dce4ce,#edf0e3_63%)] " + canvasHeight}>
        {!hydrated ? <PreviewLoading message="Restoring your workspace…" /> : status === "error" ? failure : (
          <PreviewBoundary key={attempt} fallback={failure} onError={onError}>
            <WorkspaceScene config={config} view={view} onReady={onReady} onError={onError} />
          </PreviewBoundary>
        )}
        {hydrated && status === "ready" && !config.deskId && (
          <div className="empty-preview-hint pointer-events-none absolute bottom-[22px] left-1/2 flex -translate-x-1/2 items-center gap-[9px] rounded-full border border-[#d4ddc4] bg-[#fbfcf3e6] px-[15px] py-2.5 whitespace-nowrap text-[#48613f] max-phone:bottom-[15px] max-phone:px-[11px] max-phone:py-[7px]">
            <span className="text-lg leading-normal" aria-hidden="true">+</span>
            <p className="text-[13px] max-phone:text-[12px]">Pick a desk, or try a quick start</p>
          </div>
        )}
      </div>
      <div className={"preview-bottom flex justify-between gap-[15px] px-[23px] pt-[5px] pb-[19px] max-phone:gap-3 max-phone:px-[14px] max-phone:pt-0 max-phone:pb-[15px] " + footerLayout}>
        <p className={"text-[13px] leading-[1.7] text-[#626f56] max-phone:text-center max-phone:text-[12px] " + (variant === "builder" ? "max-catalog:max-w-40 max-lg:max-w-none" : "")}>{status === "error" ? "Your selections are still available." : "A few good pieces. A space of your own."}</p>
        <div className="view-controls inline-flex shrink-0 overflow-hidden rounded-md border border-[#d2dac5] bg-[#f7f8f0]" role="group" aria-label="Camera views">
          <button className={viewButtonStyles + " min-w-[49px] text-[12px]"} type="button" aria-label="Angled view" aria-pressed={view.angle === "angle"} disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "angle", revision: current.revision + 1 }))}>Angle</button>
          <button className={viewButtonStyles + " min-w-[49px] text-[12px]"} type="button" aria-label="Front view" aria-pressed={view.angle === "front"} disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "front", revision: current.revision + 1 }))}>Front</button>
          <button className={viewButtonStyles + " min-w-11 text-lg leading-normal"} type="button" aria-label="Reset view" disabled={status !== "ready"} onClick={() => setView((current) => ({ angle: "angle", revision: current.revision + 1 }))}>↺<span className="sr-only">Reset view</span></button>
        </div>
      </div>
    </section>
  );
}
