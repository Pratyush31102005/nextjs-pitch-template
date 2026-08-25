"use client";

import { brandConfig } from "@/lib/brand-config";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          © 2026 {brandConfig.companyName}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
