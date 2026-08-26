import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tellie Prompter — The smart teleprompter that stays in sync with you",
  description:
    "The smart teleprompter that stays in sync with you. Built with Next.js.",
  metadataBase: new URL("https://tellie-prompter.vercel.app"),
  openGraph: {
    title: "Tellie Prompter — The smart teleprompter that stays in sync with you",
    description: "The smart teleprompter that stays in sync with you. Built with Next.js.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Tellie Prompter",
      },
    ],
    type: "website",
    siteName: "Tellie Prompter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tellie Prompter — The smart teleprompter that stays in sync with you",
    description: "The smart teleprompter that stays in sync with you. Built with Next.js.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrains.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
