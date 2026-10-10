import type { Metadata, Viewport } from "next";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
export const metadata: Metadata = {
  title: "PRAGYA — Understand the mind. Change the response.",
  description: "An interactive space to train attention, awareness, focus and inner calm.",
  openGraph: { title: "PRAGYA", description: "Understand the mind. Change the response.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
