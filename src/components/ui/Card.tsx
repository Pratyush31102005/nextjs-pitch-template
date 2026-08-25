"use client";

import { motion } from "framer-motion";
import { getThemeStyles } from "@/lib/theme";
import { brandConfig } from "@/lib/brand-config";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = "", delay = 0 }: CardProps) {
  const theme = getThemeStyles();

  return (
    <motion.div
      className={`relative p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(24,24,27,0.8) 0%, rgba(9,9,11,0.9) 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 30px ${theme.primary}22`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: `linear-gradient(145deg, ${brandConfig.primaryColorHex}15 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          padding: "1px",
          background: `linear-gradient(145deg, ${brandConfig.primaryColorHex}30, transparent 60%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </motion.div>
  );
}
