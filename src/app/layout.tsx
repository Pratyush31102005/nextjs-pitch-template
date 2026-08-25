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
  title: "Startup Pitch Template",
  description: "Modular micro-demo template for pitching to founders",
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
