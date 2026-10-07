import type { Metadata } from "next";
import { SummaryPage } from "@/_pages/summary";
import "./summary.css";

export const metadata: Metadata = {
  title: "Review your setup | Lil Workspace",
  description: "Review your furniture, rental duration, and equipment estimate, then confirm your demo rental.",
};

export default function SummaryRoute() {
  return <SummaryPage />;
}
