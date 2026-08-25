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

  const baseStyles =
    "relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer";

  const variants = {
    primary: {
      backgroundColor: theme.primary,
      boxShadow: theme.glow,
    },
    secondary: {
      backgroundColor: "transparent",
      border: `2px solid ${theme.primary}`,
    },
  };

  return (
    <motion.button
      className={`${baseStyles} ${className}`}
      style={variants[variant]}
      whileHover={{
        scale: 1.05,
        boxShadow: theme.glowLarge,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.button>
  );
}
