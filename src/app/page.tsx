import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { brandConfig } from "@/lib/brand-config";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: brandConfig.bgPrimary,
        color: brandConfig.textPrimary,
      }}
    >
      <Navbar />
      <Hero />
      <Showcase />
      <div id="features">
        <Features />
      </div>
      <Footer />
    </main>
  );
}
