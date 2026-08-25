import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="dark bg-gray-950 text-white min-h-screen">
      <Hero />
      <Showcase />
      <Features />
      <Footer />
    </main>
  );
}
