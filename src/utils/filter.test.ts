import test from "node:test";
import assert from "node:assert/strict";
import { filterBadges } from "./filter.ts";
import type { BadgeItem } from "./filter.ts";

const MOCK_BADGES: BadgeItem[] = [
  {
    id: "discord_staff",
    name: "Discord Staff",
    aliases: ["Staff"],
    category: "user",
    subcategory: "staff",
    badge_type: "profile_badge",
    description: "Employee badge",
    earning_method: "Be employed",
    eligibility_requirements: ["Employment"],
    status: "staff_or_internal_only",
    status_as_of: "2026-10-18",
    first_observed_at: "2015-05-13",
    discord_flag_decimal: 1,
    confidence: "verified_official",
    last_verified_at: "2026-10-18",
  },
  {
    id: "hypesquad_bravery",
    name: "HypeSquad Bravery",
    aliases: ["House of Bravery"],
    category: "user",
    subcategory: "hypesquad",
    badge_type: "profile_badge",
    tier_family: "hypesquad_house",
    description: "House of bravery",
    earning_method: "Take quiz",
    eligibility_requirements: ["Take quiz"],
    status: "obtainable",
    status_as_of: "2026-10-18",
    first_observed_at: "2018-07-25",
    discord_flag_decimal: 64,
    confidence: "verified_official",
    last_verified_at: "2026-10-18",
  },
  {
    id: "early_supporter",
    name: "Early Supporter",
    aliases: ["Nitro Early Supporter"],
    category: "user",
    subcategory: "supporter",
    badge_type: "profile_badge",
    description: "Early nitro buyer",
    earning_method: "Purchased before 2018 cutoff",
    eligibility_requirements: ["Purchased pre-2018"],
    status: "retired",
    status_as_of: "2026-10-18",
    first_observed_at: "2018-10-10",
    discord_flag_decimal: 512,
    confidence: "verified_official",
    last_verified_at: "2026-10-18",
  },
  {
    id: "boost_tier_1_month",
    name: "Server Booster (1 Month)",
    aliases: ["Boost 1M"],
    category: "boosts",
    subcategory: "boost_streak",
    badge_type: "streak_badge",
    tier_family: "server_boosting",
    description: "Boosting for 1 month",
    earning_method: "Boost a server",
    eligibility_requirements: ["1 active boost"],
    status: "obtainable",
    status_as_of: "2026-10-18",
    first_observed_at: "2019-06-04",
    discord_flag_decimal: null,
    confidence: "verified_official",
    last_verified_at: "2026-10-18",
  },
];

test("filterBadges filters by search query", () => {
  const result = filterBadges(MOCK_BADGES, { searchQuery: "bravery" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "hypesquad_bravery");
});

test("filterBadges filters by category", () => {
  const result = filterBadges(MOCK_BADGES, { category: "boosts" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "boost_tier_1_month");
});

test("filterBadges filters by status", () => {
  const result = filterBadges(MOCK_BADGES, { status: "retired" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "early_supporter");
});

test("filterBadges filters by flag presence", () => {
  const result = filterBadges(MOCK_BADGES, { hasFlagOnly: true });
  assert.equal(result.length, 3);
  assert.ok(result.every((b) => b.discord_flag_decimal !== null));
});

test("filterBadges sorts by date descending", () => {
  const result = filterBadges(MOCK_BADGES, { sortBy: "date_desc" });
  assert.equal(result[0].id, "boost_tier_1_month"); // 2019-06-04
  assert.equal(result[result.length - 1].id, "discord_staff"); // 2015-05-13
});
