/**
 * Discord Public User Flags bitmask definitions and bitwise calculations.
 * Reference: https://discord.com/developers/docs/resources/user#user-object-user-flags
 */

export interface FlagDefinition {
  name: string;
  badgeId: string;
  decimal: number;
  hex: string;
  bit: number;
  description: string;
}

export const DISCORD_USER_FLAGS: FlagDefinition[] = [
  {
    name: "Discord Staff",
    badgeId: "discord_staff",
    decimal: 1,
    hex: "0x1",
    bit: 0,
    description: "Discord Employee / Corporate Staff",
  },
  {
    name: "Partnered Server Owner",
    badgeId: "partnered_server_owner",
    decimal: 2,
    hex: "0x2",
    bit: 1,
    description: "Owner of an official Partnered Server",
  },
  {
    name: "HypeSquad Events Coordinator",
    badgeId: "hypesquad_events",
    decimal: 4,
    hex: "0x4",
    bit: 2,
    description: "Coordinator hosting offline conventions/events",
  },
  {
    name: "Bug Hunter Level 1",
    badgeId: "bug_hunter_tier_1",
    decimal: 8,
    hex: "0x8",
    bit: 3,
    description: "Verified Bug Hunter (Green)",
  },
  {
    name: "House Bravery",
    badgeId: "hypesquad_bravery",
    decimal: 64,
    hex: "0x40",
    bit: 6,
    description: "HypeSquad House of Bravery",
  },
  {
    name: "House Brilliance",
    badgeId: "hypesquad_brilliance",
    decimal: 128,
    hex: "0x80",
    bit: 7,
    description: "HypeSquad House of Brilliance",
  },
  {
    name: "House Balance",
    badgeId: "hypesquad_balance",
    decimal: 256,
    hex: "0x100",
    bit: 8,
    description: "HypeSquad House of Balance",
  },
  {
    name: "Early Supporter",
    badgeId: "early_supporter",
    decimal: 512,
    hex: "0x200",
    bit: 9,
    description: "Pre-October 2018 Nitro Subscriber",
  },
  {
    name: "Bug Hunter Level 2",
    badgeId: "bug_hunter_tier_2",
    decimal: 16384,
    hex: "0x4000",
    bit: 14,
    description: "Bug Hunter Level 2 (Gold)",
  },
  {
    name: "Early Verified Bot Developer",
    badgeId: "early_verified_bot_developer",
    decimal: 131072,
    hex: "0x20000",
    bit: 17,
    description: "Pre-August 2020 Verified Bot Developer",
  },
  {
    name: "Moderator Programs Alumni",
    badgeId: "moderator_programs_alumni",
    decimal: 262144,
    hex: "0x40000",
    bit: 18,
    description: "Discord Certified Moderator Alumni",
  },
  {
    name: "Active Developer",
    badgeId: "active_developer",
    decimal: 4194304,
    hex: "0x400000",
    bit: 22,
    description: "Developer of an active application with global slash commands",
  },
];

/**
 * Decodes a numeric bitmask into active Discord User Flags.
 */
export function decodeUserFlags(flagBitmask: number): FlagDefinition[] {
  if (isNaN(flagBitmask) || flagBitmask <= 0) return [];
  return DISCORD_USER_FLAGS.filter((f) => (flagBitmask & f.decimal) === f.decimal);
}

/**
 * Calculates the numeric bitmask from a set of selected flag decimals.
 */
export function calculateBitmask(selectedDecimals: number[]): number {
  return selectedDecimals.reduce((acc, curr) => acc | curr, 0);
}

/**
 * Checks whether a given bitmask has a specific flag active.
 */
export function hasFlag(flagBitmask: number, flagDecimal: number): boolean {
  return (flagBitmask & flagDecimal) === flagDecimal;
}
