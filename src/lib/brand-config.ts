export const brandConfig = {
  companyName: "Tellie Prompter",
  primaryColorHex: "#6366F1",
  secondaryColorHex: "#10B981",
  accentColorHex: "#6366F1",
  bgPrimary: "#1a1a1a",
  bgSecondary: "#242424",
  bgCard: "#2a2a2a",
  textPrimary: "#f5f0e8",
  textSecondary: "#a8a29e",
  textMuted: "#78716c",
  borderSubtle: "#3a3a3a",
  tagline: "The smart teleprompter that stays in sync with you",
  ctaText: "Try Tellie Free",
  featureList: [
      {
          "title": "Smart Speech Sync",
          "description": "Automatically scrolls only as you speak, never rushing your delivery.",
          "iconName": "Zap"
      },
      {
          "title": "Adaptive Prompting",
          "description": "Detects skipped words and adapts script instantly while recording.",
          "iconName": "Eye"
      },
      {
          "title": "Studio Quality",
          "description": "Record crisp video content with smooth built-in prompt overlays.",
          "iconName": "Rocket"
      }
  ],
} as const;
