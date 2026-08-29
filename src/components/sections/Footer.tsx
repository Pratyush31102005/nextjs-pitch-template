"use client";

import { brandConfig } from "@/lib/brand-config";
import { motion } from "framer-motion";

const stack = ["Next.js", "PostgreSQL", "TypeScript", "Framer Motion"];

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${brandConfig.borderSubtle}` }}>
      {/* Built with */}
      <div className="py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-widest mb-4"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: brandConfig.textMuted,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built with
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <motion.span
                key={tech}
                className="text-sm px-4 py-2 rounded-full"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.textSecondary,
                  border: `1px solid ${brandConfig.borderSubtle}`,
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-8 px-6 lg:px-16"
        style={{ borderTop: `1px solid ${brandConfig.borderSubtle}` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: brandConfig.textMuted,
            }}
          >
            © 2026 {brandConfig.companyName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors relative group/footer"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.textMuted,
                }}
              >
                <span className="group-hover/footer:text-current transition-colors" style={{ color: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = brandConfig.textPrimary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  {item}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
