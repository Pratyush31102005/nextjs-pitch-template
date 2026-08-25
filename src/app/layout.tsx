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
  title: "Acme AI — Query Postgres with Natural Language",
  description:
    "Stop writing SQL. Use plain English and get optimized queries in milliseconds. The fastest way to query your Postgres DB.",
  metadataBase: new URL("https://acme-ai.vercel.app"),
  openGraph: {
    title: "Acme AI — Query Postgres with Natural Language",
    description:
      "Stop writing SQL. Use plain English and get optimized queries in milliseconds.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Acme AI",
      },
    ],
    type: "website",
    siteName: "Acme AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acme AI — Query Postgres with Natural Language",
    description:
      "Stop writing SQL. Use plain English and get optimized queries in milliseconds.",
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
