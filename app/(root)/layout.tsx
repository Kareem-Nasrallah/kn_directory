import type { Metadata } from "next";
import { Markazi_Text, Almarai } from "next/font/google";
import "../globals.css";
import "easymde/dist/easymde.min.css";
import Navbar from "../../components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const markaziText = Markazi_Text({
  variable: "--font-title",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
});

const almarai = Almarai({
  variable: "--font-body",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "KN Directory",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${markaziText.variable} ${almarai.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
