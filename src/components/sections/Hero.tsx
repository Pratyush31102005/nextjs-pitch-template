"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/Button";
import { useEffect, useState, useRef } from "react";

const HERO_SQL = `SELECT u.name, u.email,
  COUNT(o.id) AS total_orders
FROM users u
WHERE u.active = true
ORDER BY total_orders DESC
LIMIT 10;`;

const KEYWORDS = ["SELECT", "FROM", "WHERE", "ORDER", "BY", "LIMIT", "AS"];
const FUNCTIONS = ["COUNT"];

function tokenize(text: string) {
  const tokens: { value: string; color: string }[] = [];
  const regex = /(\s+|[(),;=]|'[^']*'|[\w.]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const w = match[1];
    if (KEYWORDS.includes(w)) tokens.push({ value: w, color: "#c2703e" });
    else if (FUNCTIONS.includes(w)) tokens.push({ value: w, color: "#c2703e" });
    else if (/^\d+$/.test(w)) tokens.push({ value: w, color: "#b89b3e" });
    else if (w === "true" || w === "false") tokens.push({ value: w, color: "#98c379" });
    else tokens.push({ value: w, color: brandConfig.textSecondary });
  }
  return tokens;
}

function HighlightedSQL({ text }: { text: string }) {
  return (
    <div>
      {text.split("\n").map((line, i) => (
        <div key={i}>
          {line.length === 0
            ? "\u00A0"
            : tokenize(line).map((t, j) => (
                <span key={j} style={{ color: t.color }}>{t.value}</span>
              ))}
        </div>
      ))}
    </div>
  );
}

export function Hero({ onCtaClick }: { onCtaClick?: () => void }) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < HERO_SQL.length) {
        i++;
        setTyped(HERO_SQL.slice(0, i));
      } else {
        clearInterval(id);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center px-6 lg:px-16 overflow-hidden pt-20">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 20% 50%, ${brandConfig.primaryColorHex}08 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border"
              style={{
                backgroundColor: brandConfig.bgSecondary,
                borderColor: brandConfig.borderSubtle,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: brandConfig.secondaryColorHex }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: brandConfig.secondaryColorHex }}
                />
              </span>
              <span
                className="text-sm font-medium tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.textSecondary,
                }}
              >
                {brandConfig.companyName}
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 leading-[1.05] tracking-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: brandConfig.textPrimary,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
                The fastest way
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
                to query your
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold italic"
                style={{ color: brandConfig.primaryColorHex }}
              >
                Postgres DB
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontWeight: 500,
                color: brandConfig.textPrimary,
                opacity: 0.7,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Stop writing SQL. Use plain English and get optimized queries in
              milliseconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button variant="primary" onClick={onCtaClick}>{brandConfig.ctaText}</Button>
            </motion.div>
          </div>

          {/* Right — SQL Code Preview (visible on all screens) */}
          <motion.div
            ref={ref}
            className="mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: brandConfig.bgSecondary,
                border: `1px solid ${brandConfig.borderSubtle}`,
                boxShadow: "12px 12px 0px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  backgroundColor: brandConfig.bgPrimary,
                  borderBottom: `1px solid ${brandConfig.borderSubtle}`,
                }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#e06c75]" />
                  <div className="w-3 h-3 rounded-full bg-[#e5c07b]" />
                  <div className="w-3 h-3 rounded-full bg-[#98c379]" />
                </div>
                <span
                  className="ml-2 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.textMuted,
                  }}
                >
                  query.sql
                </span>
              </div>

              <div className="p-5">
                <div
                  className="text-sm leading-7"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  <HighlightedSQL text={typed} />
                  {!done && (
                    <span
                      className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle"
                      style={{
                        backgroundColor: brandConfig.primaryColorHex,
                        animation: "blink 1s step-end infinite",
                      }}
                    />
                  )}
                </div>

                <div
                  className="mt-4 pt-4 flex items-center gap-2"
                  style={{ borderTop: `1px solid ${brandConfig.borderSubtle}` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: brandConfig.secondaryColorHex }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: brandConfig.secondaryColorHex,
                    }}
                  >
                    {done ? "10 rows returned in 12ms" : "Executing query..."}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
