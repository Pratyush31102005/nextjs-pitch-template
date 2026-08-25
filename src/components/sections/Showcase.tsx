"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { brandConfig } from "@/lib/brand-config";
import { useEffect, useState } from "react";

export function Showcase() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 2000);
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => setShowToast(true), 500);
    }, 8000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
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
      <div className="relative flex justify-center perspective-[1000px]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl -z-10"
          style={{ background: `${brandConfig.primaryColorHex}10` }}
        />
        <motion.div
          className="w-full max-w-4xl aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer shadow-2xl"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-zinc-500 text-xs font-mono">query.sql</span>
            </div>
            <div className="flex-1 flex">
              <div className="w-12 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center pt-4 gap-2 text-zinc-600 text-xs font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="flex-1 p-6 bg-zinc-950 font-mono text-sm leading-7">
                <div>
                  <span style={{ color: "#c678dd" }}>SELECT</span>
                  <span className="text-zinc-300"> u.name, u.email,</span>
                </div>
                <div>
                  <span className="text-zinc-300">{"  "}</span>
                  <span style={{ color: "#c678dd" }}>COUNT</span>
                </div>
                <div>
                  <span className="text-zinc-300">{"  "}(</span>
                  <span style={{ color: "#e5c07b" }}>o.id</span>
                  <span className="text-zinc-300">) </span>
                  <span style={{ color: "#c678dd" }}>AS</span>
                  <span style={{ color: "#61afef" }}> order_count</span>
                </div>
                <div>
                  <span style={{ color: "#c678dd" }}>FROM</span>
                  <span style={{ color: "#e06c75" }}> users</span>
                  <span className="text-zinc-300"> u</span>
                </div>
                <div>
                  <span style={{ color: "#c678dd" }}>WHERE</span>
                  <span style={{ color: "#e5c07b" }}> u.created_at</span>
                  <span className="text-zinc-300"> &gt; </span>
                  <span style={{ color: "#98c379" }}>&apos;2026-01-01&apos;</span>
                </div>
              </div>
            </div>
            <div className="relative px-4 py-3 bg-zinc-900 border-t border-zinc-800">
              <motion.div
                className="absolute -top-12 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={showToast ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 text-xs font-mono">Query executed in 12ms</span>
              </motion.div>
              <span className="text-zinc-500 text-xs font-mono">Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
