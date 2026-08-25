"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 lg:px-16 overflow-hidden">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 20% 50%, ${brandConfig.primaryColorHex}08 0%, transparent 70%)`,
        }}
      />

      {/* Decorative faded year — fills right side without competing */}
      <div
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(120px, 15vw, 220px)",
          fontWeight: 800,
          color: brandConfig.textPrimary,
          opacity: 0.03,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        2026
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: `${brandConfig.bgSecondary}`,
              borderColor: brandConfig.borderSubtle,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: brandConfig.secondaryColorHex }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: brandConfig.secondaryColorHex }}
              />
            </span>
            <span
              className="text-sm font-medium tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: brandConfig.textSecondary,
              }}
            >
              {brandConfig.companyName}
            </span>
          </motion.div>

          {/* Headline — scaled down, breathable line-height */}
          <motion.h1
            className="mb-8 leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              color: brandConfig.textPrimary,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
              The fastest way
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
              to query your
            </span>
            <span
              className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold italic"
              style={{ color: brandConfig.primaryColorHex }}
            >
              Postgres DB
            </span>
          </motion.h1>

          {/* Subtitle — smaller for better hierarchy */}
          <motion.p
            className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: brandConfig.textSecondary,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Stop writing SQL. Use plain English and get optimized queries in
            milliseconds.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button variant="primary">{brandConfig.ctaText}</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
