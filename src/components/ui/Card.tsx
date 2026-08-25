"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = "", delay = 0 }: CardProps) {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl ${className}`}
      style={{
        backgroundColor: brandConfig.bgCard,
        border: `1px solid ${brandConfig.borderSubtle}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}
