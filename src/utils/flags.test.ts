import test from "node:test";
import assert from "node:assert/strict";
import { decodeUserFlags, calculateBitmask, hasFlag, DISCORD_USER_FLAGS } from "./flags.ts";

test("decodeUserFlags correctly decodes single flag", () => {
  const flags = decodeUserFlags(1); // Staff
  assert.equal(flags.length, 1);
  assert.equal(flags[0].name, "Discord Staff");
  assert.equal(flags[0].decimal, 1);
});

test("decodeUserFlags correctly decodes compound bitmask", () => {
  // Staff (1) + Early Supporter (512) + Active Dev (4194304) = 4194817
  const compound = 1 | 512 | 4194304;
  assert.equal(compound, 4194817);

  const decoded = decodeUserFlags(compound);
  assert.equal(decoded.length, 3);
  const names = decoded.map((d) => d.name);
  assert.ok(names.includes("Discord Staff"));
  assert.ok(names.includes("Early Supporter"));
  assert.ok(names.includes("Active Developer"));
});

test("calculateBitmask computes combined bitmask", () => {
  const decimals = [1, 2, 4];
  const mask = calculateBitmask(decimals);
  assert.equal(mask, 7);
});

test("hasFlag checks individual bit status accurately", () => {
  const mask = 512 | 64; // Early Supporter + Bravery = 576
  assert.equal(hasFlag(mask, 512), true);
  assert.equal(hasFlag(mask, 64), true);
  assert.equal(hasFlag(mask, 1), false);
  assert.equal(hasFlag(mask, 4194304), false);
});

test("decodeUserFlags handles zero and negative numbers safely", () => {
  assert.deepEqual(decodeUserFlags(0), []);
  assert.deepEqual(decodeUserFlags(-1), []);
  assert.deepEqual(decodeUserFlags(NaN), []);
});
