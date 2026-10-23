import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnimeForge — AI Edit Studio",
  description:
    "Upload your anime clips, choose an editing style and prepare your next edit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
