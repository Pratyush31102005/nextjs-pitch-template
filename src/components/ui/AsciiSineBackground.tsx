"use client";

import { useEffect, useRef } from "react";
import { brandConfig } from "@/lib/brand-config";

const CHARS = [".", "+", "-", "~", "*", "/", "\\"];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function AsciiSineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctxEl = canvasEl.getContext("2d", { alpha: true });
    if (!ctxEl) return;

    const canvas = canvasEl;
    const ctx = ctxEl;

    let animId: number;
    let time = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let prefersReducedMotion = false;

    const chars: string[][] = [];
    let gridSpacing = 40;
    let cols = 0;
    let rows = 0;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    prefersReducedMotion = reducedMotionQuery.matches;

    function handleReducedMotion(e: MediaQueryListEvent) {
      prefersReducedMotion = e.matches;
    }
    reducedMotionQuery.addEventListener("change", handleReducedMotion);

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridSpacing = w < 640 ? 80 : 40;
      cols = Math.ceil(w / gridSpacing) + 1;
      rows = Math.ceil(h / gridSpacing) + 1;

      chars.length = 0;
      for (let r = 0; r < rows; r++) {
        const row: string[] = [];
        for (let c = 0; c < cols; c++) {
          row.push(CHARS[Math.floor(seededRandom(r * cols + c) * CHARS.length)]);
        }
        chars.push(row);
      }
    }

    function hexToRgb(hex: string): { r: number; g: number; b: number } {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 194, g: 112, b: 62 };
    }

    const rgb = hexToRgb(brandConfig.primaryColorHex);

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);
      const amplitude = w < 640 ? 8 : 15;
      const frequency = 0.008;
      const speed = 0.3;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "11px 'JetBrains Mono', monospace";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gridSpacing;
          const baseY = r * gridSpacing;
          const sineY = Math.sin(x * frequency + time * speed) * amplitude;
          const y = baseY + sineY;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normalizedDist = dist / maxDist;

          const centerFade = 1 - Math.pow(1 - normalizedDist, 2);
          const opacity = 0.03 + centerFade * 0.05;

          const navbarFade = y < 80 ? Math.max(0, y / 80) : 1;
          const finalOpacity = opacity * navbarFade;

          if (finalOpacity < 0.005) continue;

          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${finalOpacity})`;
          ctx.fillText(chars[r][c], x, y);
        }
      }
    }

    function animate() {
      if (!document.hidden) {
        time += 1;
        draw();
      }
      animId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      draw();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
