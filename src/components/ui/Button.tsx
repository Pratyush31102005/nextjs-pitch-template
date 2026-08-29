"use client";

import { motion } from "framer-motion";
import { getThemeStyles } from "@/lib/theme";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const theme = getThemeStyles();

  return (
    <motion.button
      onClick={onClick}
      className={`group relative px-8 py-4 rounded-full font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center ${className}`}
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
      whileTap={{ scale: 0.97, y: 0, boxShadow: "none" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.button>
  );
}
