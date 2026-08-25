"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { brandConfig } from "@/lib/brand-config";
import { useEffect, useState, useRef } from "react";

const SQL_QUERY = `SELECT u.name, u.email,
  COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
GROUP BY u.name, u.email
LIMIT 50;`;

const KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "LEFT",
  "JOIN",
  "ON",
  "GROUP",
  "BY",
  "ORDER",
  "LIMIT",
  "AS",
];
const FUNCTIONS = ["COUNT"];

function tokenizeLine(text: string) {
  const tokens: { value: string; color: string }[] = [];
  const regex = /(\s+|[(),;=]|'[^']*'|[\w.]+)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const word = match[1];

    if (KEYWORDS.includes(word)) {
      tokens.push({ value: word, color: "#c2703e" });
    } else if (FUNCTIONS.includes(word)) {
      tokens.push({ value: word, color: "#c2703e" });
    } else if (/^\d+$/.test(word)) {
      tokens.push({ value: word, color: "#b89b3e" });
    } else if (word === "true" || word === "false") {
      tokens.push({ value: word, color: "#98c379" });
    } else if (word.startsWith("'")) {
      tokens.push({ value: word, color: "#98c379" });
    } else {
      tokens.push({ value: word, color: brandConfig.textSecondary });
    }
  }
  return tokens;
}

function SyntaxHighlightedCode({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div>
      {lines.map((line, i) => (
        <div key={i}>
          {line.length === 0 ? "\u00A0" : tokenizeLine(line).map((token, j) => (
            <span key={j} style={{ color: token.color }}>
              {token.value}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Showcase() {
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start typing when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing animation
  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < SQL_QUERY.length) {
        setTypedText(SQL_QUERY.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 38);

    return () => clearInterval(interval);
  }, [hasStarted]);

  // Show toast after typing completes
  useEffect(() => {
    if (!isTypingDone) return;

    const timer = setTimeout(() => setShowToast(true), 400);
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => setShowToast(true), 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isTypingDone]);

  const lineCount = typedText.split("\n").length;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Section>
      <div ref={sectionRef} className="flex justify-center perspective-[1200px]">
        <motion.div
          className="w-full max-w-5xl rounded-xl overflow-hidden cursor-pointer"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            backgroundColor: brandConfig.bgSecondary,
            border: `1px solid ${brandConfig.borderSubtle}`,
            boxShadow: "8px 8px 0px rgba(0,0,0,0.4)",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ y: [0, -6, 0] }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-full flex flex-col">
            {/* Title bar */}
            <div
              className="flex items-center gap-3 px-5 py-3.5"
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
                className="ml-3 text-xs"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.textMuted,
                }}
              >
                query.sql — acme-ai
              </span>
            </div>

            {/* Editor body */}
            <div className="flex min-h-[320px]">
              {/* Line numbers */}
              <div
                className="w-14 flex flex-col items-end pt-5 pb-5 pr-3"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  color: brandConfig.textMuted,
                  backgroundColor: brandConfig.bgSecondary,
                  borderRight: `1px solid ${brandConfig.borderSubtle}`,
                }}
              >
                {Array.from({ length: Math.max(lineCount, 7) }, (_, i) => (
                  <span key={i} className="leading-7">
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* SQL content with typing animation */}
              <div
                className="flex-1 p-5 leading-7"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.8125rem",
                  backgroundColor: brandConfig.bgSecondary,
                }}
              >
                <SyntaxHighlightedCode text={typedText} />
                {/* Blinking cursor */}
                {!isTypingDone && (
                  <span
                    className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle"
                    style={{
                      backgroundColor: brandConfig.primaryColorHex,
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Status bar with animated toast */}
            <div
              className="relative flex items-center px-5 py-3"
              style={{
                backgroundColor: brandConfig.bgPrimary,
                borderTop: `1px solid ${brandConfig.borderSubtle}`,
              }}
            >
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: brandConfig.textMuted,
                }}
              >
                {isTypingDone ? "Connected to prod-db" : "Typing query..."}
              </span>
              <motion.div
                className="absolute right-5 flex items-center gap-2 px-3 py-1.5 rounded-md"
                style={{
                  backgroundColor: `${brandConfig.secondaryColorHex}15`,
                  border: `1px solid ${brandConfig.secondaryColorHex}30`,
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={showToast ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: brandConfig.secondaryColorHex }}
                />
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.secondaryColorHex,
                  }}
                >
                  Query executed in 12ms
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
