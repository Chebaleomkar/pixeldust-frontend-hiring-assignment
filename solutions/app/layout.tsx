import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shift Booking App | Pixeldust",
  description: "Book and manage your work shifts with ease. A modern shift booking application.",
  keywords: ["shifts", "booking", "work", "schedule", "management"],
  authors: [{ name: "Pixeldust" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}
