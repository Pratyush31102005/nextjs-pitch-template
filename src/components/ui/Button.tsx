"use client";

import { motion } from "framer-motion";
import { getThemeStyles } from "@/lib/theme";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const theme = getThemeStyles();

  return (
    <motion.button
      className={`relative px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer ${className}`}
      style={{
        fontFamily: "var(--font-jetbrains)",
        fontSize: "0.875rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase" as const,
        ...(variant === "primary"
          ? {
              backgroundColor: theme.primary,
              color: theme.bgPrimary,
              border: `1px solid ${theme.primary}`,
              boxShadow: theme.shadowHard,
            }
          : {
              backgroundColor: "transparent",
              color: theme.textPrimary,
              border: `1px solid ${theme.borderSubtle}`,
              boxShadow: "none",
            }),
      }}
      whileHover={{
        y: -2,
        boxShadow: variant === "primary" ? theme.shadowHardHover : "none",
      }}
      whileTap={{ y: 1, boxShadow: "none" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.button>
  );
}
