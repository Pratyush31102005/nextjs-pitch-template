"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useTransform as useTransformMV } from "framer-motion";
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

const KEYWORDS = ["SELECT", "FROM", "WHERE", "LEFT", "JOIN", "ON", "GROUP", "BY", "ORDER", "LIMIT", "AS"];
const FUNCTIONS = ["COUNT"];

function tokenizeLine(text: string) {
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

function SyntaxHighlightedCode({ text }: { text: string }) {
  return (
    <div>
      {text.split("\n").map((line, i) => (
        <div key={i}>
          {line.length === 0
            ? "\u00A0"
            : tokenizeLine(line).map((token, j) => (
                <span key={j} style={{ color: token.color }}>{token.value}</span>
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based transforms for the terminal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const terminalScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const terminalRotate = useTransform(scrollYProgress, [0, 1], [2, 0]);
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing animation — loops
  useEffect(() => {
    if (!hasStarted) return;
    let index = 0;
    let timeoutId: NodeJS.Timeout;
    function typeNext() {
      if (index < SQL_QUERY.length) {
        index++;
        setTypedText(SQL_QUERY.slice(0, index));
        timeoutId = setTimeout(typeNext, 38);
      } else {
        setIsTypingDone(true);
        timeoutId = setTimeout(() => {
          setTypedText("");
          setIsTypingDone(false);
          index = 0;
          timeoutId = setTimeout(typeNext, 800);
        }, 3000);
      }
    }
    typeNext();
    return () => clearTimeout(timeoutId);
  }, [hasStarted]);

  // Show toast after typing completes
  useEffect(() => {
    if (!isTypingDone) return;
    const timer = setTimeout(() => setShowToast(true), 400);
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => setShowToast(true), 500);
    }, 8000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [isTypingDone]);

  const lineCount = typedText.split("\n").length;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransformMV(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransformMV(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <div ref={containerRef}>
      <Section>
        <div ref={sectionRef} className="flex justify-center perspective-[1200px]">
          <motion.div
            className="w-full max-w-5xl rounded-xl overflow-hidden cursor-pointer"
            style={{
              rotateX,
              rotateY,
              scale: terminalScale,
              transformStyle: "preserve-3d",
              backgroundColor: brandConfig.bgSecondary,
              border: `1px solid ${brandConfig.borderSubtle}`,
              boxShadow: "8px 8px 0px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, rotateX: 4, scale: 0.95 }}
            whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ y: [0, -6, 0] }}
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
                <span className="ml-3 text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>
                  query.sql — acme-ai
                </span>
              </div>

              {/* Editor body */}
              <div className="flex min-h-[320px]">
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
                    <span key={i} className="leading-7">{i + 1}</span>
                  ))}
                </div>

                <div
                  className="flex-1 p-5 leading-7"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.8125rem",
                    backgroundColor: brandConfig.bgSecondary,
                  }}
                >
                  <SyntaxHighlightedCode text={typedText} />
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

              {/* Status bar */}
              <div
                className="relative flex items-center px-5 py-3"
                style={{
                  backgroundColor: brandConfig.bgPrimary,
                  borderTop: `1px solid ${brandConfig.borderSubtle}`,
                }}
              >
                <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>
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
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandConfig.secondaryColorHex }} />
                  <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.secondaryColorHex }}>
                    Query executed in 12ms
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
