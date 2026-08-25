"use client";

import { brandConfig } from "@/lib/brand-config";

export function Footer() {
  return (
    <footer
      className="py-10 px-6 lg:px-16"
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
              className="text-sm transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: brandConfig.textMuted,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = brandConfig.textPrimary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = brandConfig.textMuted)
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
