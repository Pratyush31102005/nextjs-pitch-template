"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
