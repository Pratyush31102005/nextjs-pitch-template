export const brandConfig = {
  companyName: "Acme AI",
  primaryColorHex: "#c2703e",
  secondaryColorHex: "#6b7c4e",
  accentColorHex: "#b89b3e",
  bgPrimary: "#1a1a1a",
  bgSecondary: "#242424",
  bgCard: "#2a2a2a",
  textPrimary: "#f5f0e8",
  textSecondary: "#a8a29e",
  textMuted: "#78716c",
  borderSubtle: "#3a3a3a",
  tagline: "The fastest way to query your Postgres DB",
  ctaText: "Start Querying",
  featureList: [
    {
      title: "Live Sandbox",
      description: "Test queries instantly in a real database environment",
      iconName: "Zap",
    },
    {
      title: "Auto-indexing",
      description: "Zero setup required — we handle the optimization",
      iconName: "Database",
    },
    {
      title: "Team Collaboration",
      description: "Share & review queries with your engineering team",
      iconName: "Users",
    },
  ],
} as const;
