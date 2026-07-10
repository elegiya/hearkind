import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HearKind",
  description:
    "Private peer support for people going through similar life challenges",

  metadataBase: new URL("https://hearkind.app"),

  openGraph: {
    title: "HearKind",
    description:
      "Private peer support matched by shared lived experience",
    url: "https://hearkind.app",
    siteName: "HearKind",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://hearkind.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}