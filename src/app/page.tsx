"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { AsciiSineBackground } from "@/components/ui/AsciiSineBackground";
import { brandConfig } from "@/lib/brand-config";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AsciiSineBackground />
      <main
        className="min-h-screen relative"
        style={{
          backgroundColor: brandConfig.bgPrimary,
          color: brandConfig.textPrimary,
        }}
      >
        <Navbar />
        <Hero onCtaClick={() => setModalOpen(true)} />
        <Showcase />
        <div id="features">
          <Features />
        </div>
        <Footer />
        <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
    </>
  );
}
