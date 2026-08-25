"use client";

import { motion, AnimatePresence } from "framer-motion";
import { brandConfig } from "@/lib/brand-config";
import { useState } from "react";
import { X, Check } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{
              backgroundColor: brandConfig.bgSecondary,
              border: `1px solid ${brandConfig.borderSubtle}`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: brandConfig.textMuted }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = brandConfig.textPrimary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = brandConfig.textMuted)
              }
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    backgroundColor: `${brandConfig.secondaryColorHex}15`,
                    border: `1px solid ${brandConfig.secondaryColorHex}30`,
                  }}
                >
                  <Check size={28} style={{ color: brandConfig.secondaryColorHex }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: brandConfig.textPrimary,
                  }}
                >
                  Thanks for subscribing!
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.textSecondary,
                  }}
                >
                  We&apos;ll let you know when we&apos;re ready.
                </p>
                <button
                  onClick={onClose}
                  className="text-sm font-medium px-6 py-2.5 rounded-md transition-all"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.textPrimary,
                    border: `1px solid ${brandConfig.borderSubtle}`,
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = brandConfig.primaryColorHex;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = brandConfig.borderSubtle;
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: brandConfig.textPrimary,
                  }}
                >
                  Join the waitlist
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: brandConfig.textSecondary,
                  }}
                >
                  Get early access when we launch.
                </p>

                <div className="flex gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      backgroundColor: brandConfig.bgPrimary,
                      border: `1px solid ${brandConfig.borderSubtle}`,
                      color: brandConfig.textPrimary,
                      minHeight: "44px",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        brandConfig.primaryColorHex)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        brandConfig.borderSubtle)
                    }
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      backgroundColor: brandConfig.primaryColorHex,
                      color: brandConfig.bgPrimary,
                      border: `1px solid ${brandConfig.primaryColorHex}`,
                      minHeight: "44px",
                    }}
                  >
                    {status === "loading" ? "..." : "Join"}
                  </button>
                </div>

                {status === "error" && errorMsg && (
                  <p
                    className="text-sm mt-3"
                    style={{ color: "#e06c75", fontFamily: "var(--font-jetbrains)" }}
                  >
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
