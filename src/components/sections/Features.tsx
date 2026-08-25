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

export function Features() {
  return (
    <Section>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Everything you need
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {brandConfig.featureList.map((feature, i) => {
          const Icon = iconMap[feature.iconName as keyof typeof iconMap];
          return (
            <Card key={feature.title} delay={i * 0.15}>
              <div className="flex flex-col items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${brandConfig.primaryColorHex}22`,
                  }}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      style={{ color: brandConfig.primaryColorHex }}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
