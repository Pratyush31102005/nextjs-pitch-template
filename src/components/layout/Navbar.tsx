"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

export function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: brandConfig.bgPrimary,
        borderBottom: `1px solid ${brandConfig.borderSubtle}`,
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6 lg:px-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: brandConfig.primaryColorHex,
              color: brandConfig.bgPrimary,
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            A
          </div>
          <span
            className="text-sm font-semibold tracking-wide"
            style={{
              color: brandConfig.textPrimary,
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            {brandConfig.companyName}
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: brandConfig.textSecondary,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = brandConfig.textPrimary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = brandConfig.textSecondary)
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Login CTA */}
        <a
          href="#"
          className="text-sm font-medium px-4 py-1.5 rounded-md transition-all"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: brandConfig.textPrimary,
            border: `1px solid ${brandConfig.borderSubtle}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = brandConfig.primaryColorHex;
            e.currentTarget.style.color = brandConfig.primaryColorHex;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = brandConfig.borderSubtle;
            e.currentTarget.style.color = brandConfig.textPrimary;
          }}
        >
          Login
        </a>
      </div>
    </motion.header>
  );
}
