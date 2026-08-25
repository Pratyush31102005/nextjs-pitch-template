"use client";

import { motion, AnimatePresence } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors py-2"
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

        <div className="flex items-center gap-3">
          {/* Login — desktop */}
          <a
            href="#"
            className="hidden md:inline-flex text-sm font-medium px-5 py-2.5 rounded-md transition-all items-center"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: brandConfig.textPrimary,
              border: `1px solid ${brandConfig.borderSubtle}`,
              minHeight: "44px",
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

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-md transition-colors"
            style={{
              color: brandConfig.textPrimary,
              border: `1px solid ${brandConfig.borderSubtle}`,
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: brandConfig.bgPrimary,
              borderBottom: `1px solid ${brandConfig.borderSubtle}`,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col px-6 pb-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm py-3 rounded-md transition-colors"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.textSecondary,
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setMobileOpen(false)}
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
              <a
                href="#"
                className="text-sm font-medium py-3 rounded-md transition-all mt-2 text-center"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.bgPrimary,
                  backgroundColor: brandConfig.primaryColorHex,
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
