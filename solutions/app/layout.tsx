import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shift Booking App | Pixeldust",
  description: "Book and manage your work shifts with ease. A modern, responsive shift booking application built with Next.js and TypeScript.",
  keywords: ["shifts", "booking", "work", "schedule", "management", "employee", "workforce", "time management"],
  authors: [{ name: "Omkar Chebale" }, { name: "Pixeldust" }],
  creator: "Omkar Chebale",
  publisher: "Pixeldust",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shift-booking.pixeldust.com",
    siteName: "Shift Booking App",
    title: "Shift Booking App | Pixeldust",
    description: "Book and manage your work shifts with ease. A modern, responsive shift booking application.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shift Booking App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Booking App | Pixeldust",
    description: "Book and manage your work shifts with ease.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/piexeldust.svg",
    shortcut: "/piexeldust.svg",
    apple: "/piexeldust.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
