"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { brandConfig } from "@/lib/brand-config";
import { useEffect, useState } from "react";

export function Showcase() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 2500);
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => setShowToast(true), 500);
    }, 9000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

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
      <div className="flex justify-center perspective-[1200px]">
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
                className="w-14 flex flex-col items-end pt-5 pb-5 pr-3 gap-0.5"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  color: brandConfig.textMuted,
                  backgroundColor: brandConfig.bgSecondary,
                  borderRight: `1px solid ${brandConfig.borderSubtle}`,
                }}
              >
                {["1", "2", "3", "4", "5", "6", "7"].map((n) => (
                  <span key={n} className="leading-7">
                    {n}
                  </span>
                ))}
              </div>

              {/* SQL content */}
              <div
                className="flex-1 p-5 leading-7"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.8125rem",
                  backgroundColor: brandConfig.bgSecondary,
                }}
              >
                <div>
                  <span style={{ color: "#c2703e" }}>SELECT</span>
                  <span style={{ color: brandConfig.textSecondary }}> u.name, u.email,</span>
                </div>
                <div>
                  <span style={{ color: brandConfig.textSecondary }}>{"  "}</span>
                  <span style={{ color: "#c2703e" }}>COUNT</span>
                  <span style={{ color: brandConfig.textSecondary }}>(o.id)</span>
                  <span style={{ color: "#c2703e" }}> AS</span>
                  <span style={{ color: "#b89b3e" }}> order_count</span>
                </div>
                <div>
                  <span style={{ color: "#c2703e" }}>FROM</span>
                  <span style={{ color: brandConfig.textSecondary }}> users </span>
                  <span style={{ color: "#c2703e" }}>u</span>
                </div>
                <div>
                  <span style={{ color: "#c2703e" }}>LEFT JOIN</span>
                  <span style={{ color: brandConfig.textSecondary }}> orders </span>
                  <span style={{ color: "#c2703e" }}>o</span>
                </div>
                <div>
                  <span style={{ color: "#c2703e" }}>{"  ON"}</span>
                  <span style={{ color: brandConfig.textSecondary }}> u.id </span>
                  <span style={{ color: "#c2703e" }}>=</span>
                  <span style={{ color: brandConfig.textSecondary }}> o.user_id</span>
                </div>
                <div>
                  <span style={{ color: "#c2703e" }}>GROUP BY</span>
                  <span style={{ color: brandConfig.textSecondary }}> u.name, u.email</span>
                </div>
                <div>
                  <span style={{ color: "#c2703e" }}>LIMIT</span>
                  <span style={{ color: "#b89b3e" }}> 50</span>
                  <span style={{ color: brandConfig.textMuted }}>;</span>
                </div>
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
                Connected to prod-db
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
