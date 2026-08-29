"use client";

import { motion, useInView } from "framer-motion";
import { Zap, Database, Users } from "lucide-react";
import { brandConfig } from "@/lib/brand-config";
import { Section } from "@/components/ui/Section";
import { useRef } from "react";

const iconMap = { Zap, Database, Users };

function PerformanceDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-5">
      <div className="flex items-center justify-between text-xs mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>
        <span style={{ color: brandConfig.textMuted }}>Query performance</span>
      </div>

      {/* Before bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>Before</span>
          <span className="text-xs font-medium" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textPrimary }}>842 ms</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${brandConfig.borderSubtle}` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "#e06c75" }}
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* After bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>After</span>
          <span className="text-xs font-medium" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.secondaryColorHex }}>73 ms</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: brandConfig.borderSubtle }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: brandConfig.secondaryColorHex }}
            initial={{ width: 0 }}
            animate={inView ? { width: "8.7%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Delta */}
      <motion.div
        className="flex items-center gap-2 pt-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <span className="text-lg font-bold" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.secondaryColorHex }}>↓ 91%</span>
        <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>latency reduction</span>
      </motion.div>
    </div>
  );
}

function LiveSandboxDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandConfig.secondaryColorHex }} />
        <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>Live sandbox</span>
      </div>
      <div
        className="rounded-lg p-3 text-xs leading-6"
        style={{
          fontFamily: "var(--font-jetbrains)",
          backgroundColor: brandConfig.bgPrimary,
          border: `1px solid ${brandConfig.borderSubtle}`,
        }}
      >
        <span style={{ color: "#c2703e" }}>SELECT</span>
        <span style={{ color: brandConfig.textSecondary }}> *</span>
        <span style={{ color: "#c2703e" }}> FROM</span>
        <span style={{ color: brandConfig.textSecondary }}> users</span>
        <span style={{ color: "#c2703e" }}> LIMIT</span>
        <span style={{ color: "#b89b3e" }}> 5</span>
        <span style={{ color: brandConfig.textMuted }}>;</span>
      </div>
      <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-jetbrains)" }}>
        <span style={{ color: brandConfig.secondaryColorHex }}>✓</span>
        <span style={{ color: brandConfig.textMuted }}>5 rows returned instantly</span>
      </div>
    </div>
  );
}

function TeamDemo() {
  const members = [
    { name: "S", color: "#c2703e" },
    { name: "M", color: "#6b7c4e" },
    { name: "E", color: "#b89b3e" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {members.map((m, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2"
              style={{
                backgroundColor: m.color,
                color: brandConfig.bgPrimary,
                fontFamily: "var(--font-jetbrains)",
                borderColor: brandConfig.bgCard,
              }}
            >
              {m.name}
            </div>
          ))}
        </div>
        <span className="text-xs" style={{ fontFamily: "var(--font-jetbrains)", color: brandConfig.textMuted }}>3 online</span>
      </div>
      <div
        className="rounded-lg p-3 text-xs"
        style={{
          fontFamily: "var(--font-jetbrains)",
          backgroundColor: brandConfig.bgPrimary,
          border: `1px solid ${brandConfig.borderSubtle}`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "#c2703e", color: brandConfig.bgPrimary }}>S</div>
          <span style={{ color: brandConfig.textMuted }}>sarah commented:</span>
        </div>
        <p style={{ color: brandConfig.textSecondary }}>&quot;Added index on <span style={{ color: "#b89b3e" }}>orders.user_id</span>&quot;</p>
      </div>
    </div>
  );
}

const featureDemos = [
  { component: LiveSandboxDemo },
  { component: PerformanceDemo },
  { component: TeamDemo },
];

export function Features() {
  return (
    <Section>
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            color: brandConfig.textPrimary,
          }}
        >
          Everything you need.
        </h2>
      </motion.div>

      {/* Bento grid: 1 large + 2 small */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Live Sandbox — small */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: brandConfig.bgCard,
            border: `1px solid ${brandConfig.borderSubtle}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0 }}
          whileHover={{ y: -4, borderColor: brandConfig.primaryColorHex, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${brandConfig.primaryColorHex}15`,
                border: `1px solid ${brandConfig.primaryColorHex}30`,
              }}
            >
              <Zap size={20} style={{ color: brandConfig.primaryColorHex }} />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-playfair)", color: brandConfig.textPrimary }}>
                Live Sandbox
              </h3>
              <p className="text-xs" style={{ color: brandConfig.textMuted }}>Test queries instantly</p>
            </div>
          </div>
          <LiveSandboxDemo />
        </motion.div>

        {/* Auto-indexing — large, spans 2 cols */}
        <motion.div
          className="md:col-span-2 rounded-2xl p-6"
          style={{
            backgroundColor: brandConfig.bgCard,
            border: `1px solid ${brandConfig.borderSubtle}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          whileHover={{ y: -4, borderColor: brandConfig.secondaryColorHex, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${brandConfig.secondaryColorHex}15`,
                border: `1px solid ${brandConfig.secondaryColorHex}30`,
              }}
            >
              <Database size={20} style={{ color: brandConfig.secondaryColorHex }} />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-playfair)", color: brandConfig.textPrimary }}>
                Auto-indexing
              </h3>
              <p className="text-xs" style={{ color: brandConfig.textMuted }}>Zero setup required</p>
            </div>
          </div>
          <PerformanceDemo />
        </motion.div>

        {/* Team Collaboration — small */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: brandConfig.bgCard,
            border: `1px solid ${brandConfig.borderSubtle}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.24 }}
          whileHover={{ y: -4, borderColor: brandConfig.accentColorHex, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${brandConfig.accentColorHex}15`,
                border: `1px solid ${brandConfig.accentColorHex}30`,
              }}
            >
              <Users size={20} style={{ color: brandConfig.accentColorHex }} />
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-playfair)", color: brandConfig.textPrimary }}>
                Team Collab
              </h3>
              <p className="text-xs" style={{ color: brandConfig.textMuted }}>Share & review queries</p>
            </div>
          </div>
          <TeamDemo />
        </motion.div>
      </div>
    </Section>
  );
}
