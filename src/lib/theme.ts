import { brandConfig } from "./brand-config";

export function getThemeStyles() {
  return {
    primary: brandConfig.primaryColorHex,
    primaryHover: adjustBrightness(brandConfig.primaryColorHex, -15),
    glow: `0 0 20px ${brandConfig.primaryColorHex}66, 0 0 40px ${brandConfig.primaryColorHex}33`,
    glowLarge: `0 0 30px ${brandConfig.primaryColorHex}88, 0 0 60px ${brandConfig.primaryColorHex}44`,
  };
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + Math.round(2.55 * percent)));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + Math.round(2.55 * percent)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
