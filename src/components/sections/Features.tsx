"use client";

import { motion } from "framer-motion";
import { Zap, Database, Users } from "lucide-react";
import { brandConfig } from "@/lib/brand-config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const iconMap = {
  Zap,
  Database,
  Users,
};

const accentColors = [
  brandConfig.primaryColorHex,
  brandConfig.secondaryColorHex,
  brandConfig.accentColorHex,
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

      {/* Equal 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {brandConfig.featureList.map((feature, i) => {
          const Icon = iconMap[feature.iconName as keyof typeof iconMap];
          return (
            <Card key={feature.title} delay={i * 0.12} className="min-h-[220px]">
              <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${accentColors[i]}15`,
                    border: `1px solid ${accentColors[i]}30`,
                  }}
                >
                  {Icon && (
                    <Icon size={24} style={{ color: accentColors[i] }} />
                  )}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: brandConfig.textPrimary,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: brandConfig.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
