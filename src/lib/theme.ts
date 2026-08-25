import { brandConfig } from "./brand-config";

export function getThemeStyles() {
  return {
    primary: brandConfig.primaryColorHex,
    secondary: brandConfig.secondaryColorHex,
    accent: brandConfig.accentColorHex,
    bgPrimary: brandConfig.bgPrimary,
    bgSecondary: brandConfig.bgSecondary,
    bgCard: brandConfig.bgCard,
    textPrimary: brandConfig.textPrimary,
    textSecondary: brandConfig.textSecondary,
    textMuted: brandConfig.textMuted,
    borderSubtle: brandConfig.borderSubtle,
    shadowHard: `4px 4px 0px ${brandConfig.primaryColorHex}`,
    shadowHardHover: `6px 6px 0px ${brandConfig.primaryColorHex}`,
  };
}
