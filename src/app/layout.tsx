import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toss Weather",
  description: "Current weather and five-day forecasts for selected cities."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
