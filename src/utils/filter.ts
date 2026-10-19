export interface BadgeItem {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  subcategory: string;
  badge_type: string;
  tier_family?: string | null;
  tier_level?: number | null;
  tier_threshold?: string | null;
  description: string;
  earning_method: string;
  eligibility_requirements: string[];
  status: string;
  status_as_of: string;
  first_observed_at?: string | null;
  official_release_date?: string | null;
  availability_start?: string | null;
  availability_end?: string | null;
  retirement_date?: string | null;
  eligibility_scope?: string | null;
  previous_names?: string[];
  previous_asset_ids?: string[];
  current_asset_id?: string | null;
  asset_variants?: Array<{
    variant_type: string;
    path: string;
    format: string;
    is_animated?: boolean;
    theme?: string;
  }>;
  official_sources?: string[];
  community_sources?: string[];
  source_repository_paths?: string[];
  discord_flag_decimal?: number | null;
  discord_flag_hex?: string | null;
  discord_flag_bit?: number | null;
  confidence: string;
  last_verified_at: string;
  notes?: string[];
}

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
  status?: string;
  tierFamily?: string;
  hasFlagOnly?: boolean;
  sortBy?: "featured" | "name_asc" | "name_desc" | "date_desc" | "date_asc" | "flag_asc" | "status";
}

const FEATURED_CATEGORY_RANK: Record<string, number> = {
  user: 1,
  nitro: 2,
  boosts: 3,
  applications: 4,
  servers: 5,
  special: 6,
  legacy: 7,
  events: 8,
  progression: 9,
  experiments: 10,
};

const FEATURED_BADGE_ORDER: Record<string, number> = {
  discord_staff: 1,
  partnered_server_owner: 2,
  hypesquad_events: 3,
  hypesquad_bravery: 4,
  hypesquad_brilliance: 5,
  hypesquad_balance: 6,
  early_supporter: 7,
  bug_hunter_tier_1: 8,
  bug_hunter_tier_2: 9,
  active_developer: 10,
  early_verified_bot_developer: 11,
  moderator_programs_alumni: 12,
  legacy_username: 13,
  discord_nitro: 14,
  discord_nitro_basic: 15,
  boost_tier_1_month: 16,
  boost_tier_2_months: 17,
  boost_tier_3_months: 18,
  boost_tier_6_months: 19,
  boost_tier_12_months: 20,
  boost_tier_24_months: 21,
  nitro_tenure_bronze: 22,
  nitro_tenure_silver: 23,
  nitro_tenure_gold: 24,
  nitro_tenure_platinum: 25,
  nitro_tenure_diamond: 26,
  nitro_tenure_emerald: 27,
  nitro_tenure_ruby: 28,
  nitro_tenure_opal: 29,
  old_discord_mod: 30,
  old_discord_nitro: 31,
  old_discord_partner: 32,
  golden_hypesquad_balance: 33,
  koth_hypesquad_balance: 34,
  server_verified: 35,
  server_partnered: 36,
  server_community_dark: 37,
  server_boost_level_3: 38,
  server_owner_crown: 39,
  server_new_member: 40,
  supports_commands: 41,
  uses_automod: 42,
  premium_bot: 43,
  special_bot: 44,
  special_verified_bot: 45,
  special_official: 46,
  special_system: 47,
  special_original_poster: 48,
  special_ai: 49,
  quest_completion: 50,
  orbs_apprentice: 51,
  lootbox_clown_2024: 52,
  last_meadow_online: 53,
};

const STATUS_PRIORITY: Record<string, number> = {
  staff_or_internal_only: 1,
  retired: 2,
  historical_only: 3,
  conditionally_obtainable: 4,
  limited_time: 5,
  experimental: 6,
  announced_upcoming: 7,
  obtainable: 8,
  unconfirmed: 9,
  unknown: 10,
};

export function filterBadges(badges: BadgeItem[], options: FilterOptions): BadgeItem[] {
  const query = options.searchQuery?.trim().toLowerCase() || "";
  const cat = options.category && options.category !== "all" ? options.category : null;
  const stat = options.status && options.status !== "all" ? options.status : null;
  const fam = options.tierFamily && options.tierFamily !== "all" ? options.tierFamily : null;
  const flagOnly = !!options.hasFlagOnly;

  return badges
    .filter((b) => {
      // Category filter
      if (cat && b.category !== cat) return false;

      // Status filter
      if (stat && b.status !== stat) return false;

      // Tier family filter
      if (fam && b.tier_family !== fam) return false;

      // Flag filter
      if (flagOnly && (b.discord_flag_decimal === null || b.discord_flag_decimal === undefined)) {
        return false;
      }

      // Query filter
      if (query) {
        const nameMatch = b.name.toLowerCase().includes(query);
        const idMatch = b.id.toLowerCase().includes(query);
        const descMatch = b.description.toLowerCase().includes(query);
        const subMatch = b.subcategory.toLowerCase().includes(query);
        const aliasMatch = b.aliases?.some((a) => a.toLowerCase().includes(query));
        const threshMatch = b.tier_threshold?.toLowerCase().includes(query);
        if (!nameMatch && !idMatch && !descMatch && !subMatch && !aliasMatch && !threshMatch) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const sort = options.sortBy || "featured";
      if (sort === "featured") {
        const orderA = FEATURED_BADGE_ORDER[a.id] ?? 999;
        const orderB = FEATURED_BADGE_ORDER[b.id] ?? 999;
        if (orderA !== orderB) return orderA - orderB;

        const catA = FEATURED_CATEGORY_RANK[a.category] ?? 99;
        const catB = FEATURED_CATEGORY_RANK[b.category] ?? 99;
        if (catA !== catB) return catA - catB;

        return a.name.localeCompare(b.name);
      }
      if (sort === "name_asc") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "name_desc") {
        return b.name.localeCompare(a.name);
      }
      if (sort === "date_desc") {
        const dateA = a.first_observed_at || "1970-01-01";
        const dateB = b.first_observed_at || "1970-01-01";
        return dateB.localeCompare(dateA);
      }
      if (sort === "date_asc") {
        const dateA = a.first_observed_at || "9999-99-99";
        const dateB = b.first_observed_at || "9999-99-99";
        return dateA.localeCompare(dateB);
      }
      if (sort === "flag_asc") {
        const flagA = a.discord_flag_decimal ?? 999999999;
        const flagB = b.discord_flag_decimal ?? 999999999;
        return flagA - flagB;
      }
      if (sort === "status") {
        const prioA = STATUS_PRIORITY[a.status] ?? 99;
        const prioB = STATUS_PRIORITY[b.status] ?? 99;
        return prioA - prioB;
      }
      return 0;
    });
}
