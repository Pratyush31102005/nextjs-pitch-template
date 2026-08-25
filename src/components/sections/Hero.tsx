"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const words = brandConfig.tagline.split(" ");

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 45%, ${brandConfig.primaryColorHex}15 0%, transparent 70%)`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10" style={{ background: `${brandConfig.primaryColorHex}10` }} />
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-zinc-300 text-sm font-medium tracking-wide uppercase">
            {brandConfig.companyName}
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.1,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Stop writing SQL. Use plain English and get optimized queries in
          milliseconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button variant="primary">{brandConfig.ctaText}</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
