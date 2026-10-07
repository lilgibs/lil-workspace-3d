import type { Metadata } from "next";
import localFont from "next/font/local";
import { BRANDING } from "@/shared/config/branding";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRANDING.productName} | ${BRANDING.description}`,
  description: "Build your ideal workspace. Pick your furniture, see your setup, and review your rental.",
  authors: [{ name: BRANDING.creatorName }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
