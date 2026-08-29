"use client";

import { motion, AnimatePresence } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/Button";
import { useEffect, useState, useRef } from "react";

const PROMPT = "Show customers with more than 5 orders this month";
const SQL = `SELECT u.name, u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2026-08-01'
GROUP BY u.name, u.email
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;`;

const RESULTS = [
  { name: "Sarah Chen", email: "sarah@acme.co", orders: 23 },
  { name: "Marcus Johnson", email: "marcus@acme.co", orders: 17 },
  { name: "Elena Rodriguez", email: "elena@acme.co", orders: 12 },
  { name: "David Kim", email: "david@acme.co", orders: 8 },
];

type Phase = "prompt" | "sql" | "results";

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "LEFT", "JOIN", "ON", "GROUP", "BY",
  "HAVING", "ORDER", "ASC", "DESC", "AS", "COUNT",
];
const LITERALS = ["'2026-08-01'", "5"];

function tokenize(text: string) {
  const tokens: { value: string; color: string }[] = [];
  const regex = /(\s+|[(),;=]|'[^']*'|[\w.]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const w = match[1];
    if (KEYWORDS.includes(w)) tokens.push({ value: w, color: "#c2703e" });
    else if (LITERALS.includes(w) || /^\d+$/.test(w))
      tokens.push({ value: w, color: "#b89b3e" });
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
                <span key={j} style={{ color: t.color }}>
                  {t.value}
                </span>
              ))}
        </div>
      ))}
    </div>
  );
}

export function Hero({ onCtaClick }: { onCtaClick?: () => void }) {
  const [phase, setPhase] = useState<Phase>("prompt");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedSql, setTypedSql] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Phase 1: type prompt
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < PROMPT.length) {
        i++;
        setTypedPrompt(PROMPT.slice(0, i));
      } else {
        clearInterval(id);
        setTimeout(() => setPhase("sql"), 800);
      }
    }, 45);
    return () => clearInterval(id);
  }, []);

  // Phase 2: type SQL
  useEffect(() => {
    if (phase !== "sql") return;
    let i = 0;
    const id = setInterval(() => {
      if (i < SQL.length) {
        i++;
        setTypedSql(SQL.slice(0, i));
      } else {
        clearInterval(id);
        setTimeout(() => {
          setPhase("results");
          setShowResults(true);
        }, 600);
      }
    }, 18);
    return () => clearInterval(id);
  }, [phase]);

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
              <Button variant="primary" onClick={onCtaClick}>
                {brandConfig.ctaText}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Right — Demo Terminal */}
          <motion.div
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
              {/* Title bar */}
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
                  {phase === "prompt" ? "Acme AI — Ask anything" : "query.sql — acme-ai"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 min-h-[340px]">
                <AnimatePresence mode="wait">
                  {phase === "prompt" && (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                          style={{
                            backgroundColor: brandConfig.primaryColorHex,
                            color: brandConfig.bgPrimary,
                            fontFamily: "var(--font-jetbrains)",
                          }}
                        >
                          You
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color: brandConfig.textPrimary,
                          }}
                        >
                          {typedPrompt}
                          <span
                            className="inline-block w-[2px] h-[1em] ml-[1px] align-middle"
                            style={{
                              backgroundColor: brandConfig.primaryColorHex,
                              animation: "blink 1s step-end infinite",
                            }}
                          />
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {(phase === "sql" || phase === "results") && (
                    <motion.div
                      key="sql"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* User prompt */}
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                          style={{
                            backgroundColor: brandConfig.primaryColorHex,
                            color: brandConfig.bgPrimary,
                            fontFamily: "var(--font-jetbrains)",
                          }}
                        >
                          You
                        </div>
                        <p
                          className="text-sm"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color: brandConfig.textSecondary,
                          }}
                        >
                          {PROMPT}
                        </p>
                      </div>

                      {/* AI response */}
                      <div className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                          style={{
                            backgroundColor: brandConfig.secondaryColorHex,
                            color: brandConfig.bgPrimary,
                            fontFamily: "var(--font-jetbrains)",
                          }}
                        >
                          AI
                        </div>
                        <div
                          className="text-sm leading-7 flex-1"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          <HighlightedSQL text={typedSql} />
                          {phase === "sql" && (
                            <span
                              className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle"
                              style={{
                                backgroundColor: brandConfig.secondaryColorHex,
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Results table */}
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="mt-5 rounded-lg overflow-hidden"
                          style={{ border: `1px solid ${brandConfig.borderSubtle}` }}
                        >
                          <table className="w-full text-xs">
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: brandConfig.bgPrimary,
                                  borderBottom: `1px solid ${brandConfig.borderSubtle}`,
                                }}
                              >
                                <th className="text-left px-3 py-2 font-medium" style={{ color: brandConfig.textMuted, fontFamily: "var(--font-jetbrains)" }}>name</th>
                                <th className="text-left px-3 py-2 font-medium" style={{ color: brandConfig.textMuted, fontFamily: "var(--font-jetbrains)" }}>email</th>
                                <th className="text-right px-3 py-2 font-medium" style={{ color: brandConfig.textMuted, fontFamily: "var(--font-jetbrains)" }}>orders</th>
                              </tr>
                            </thead>
                            <tbody>
                              {RESULTS.map((row, i) => (
                                <motion.tr
                                  key={row.email}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 * i }}
                                  style={{
                                    borderBottom: i < RESULTS.length - 1 ? `1px solid ${brandConfig.borderSubtle}` : "none",
                                  }}
                                >
                                  <td className="px-3 py-2" style={{ color: brandConfig.textPrimary, fontFamily: "var(--font-jetbrains)" }}>{row.name}</td>
                                  <td className="px-3 py-2" style={{ color: brandConfig.textSecondary, fontFamily: "var(--font-jetbrains)" }}>{row.email}</td>
                                  <td className="px-3 py-2 text-right font-medium" style={{ color: brandConfig.primaryColorHex, fontFamily: "var(--font-jetbrains)" }}>{row.orders}</td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                          <div
                            className="px-3 py-2 text-right"
                            style={{
                              backgroundColor: brandConfig.bgPrimary,
                              borderTop: `1px solid ${brandConfig.borderSubtle}`,
                              fontFamily: "var(--font-jetbrains)",
                              fontSize: "0.6875rem",
                              color: brandConfig.textMuted,
                            }}
                          >
                            127 rows • 42ms
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
