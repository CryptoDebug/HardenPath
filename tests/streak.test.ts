import assert from "node:assert/strict";
import test from "node:test";
import { nextStreak } from "../lib/streak";

test("starts, continues, preserves, and resets a learning streak", () => {
  assert.equal(nextStreak(0, null, new Date("2026-06-23T12:00:00Z")), 1);
  assert.equal(nextStreak(3, new Date("2026-06-23T01:00:00Z"), new Date("2026-06-23T22:00:00Z")), 3);
  assert.equal(nextStreak(3, new Date("2026-06-22T23:00:00Z"), new Date("2026-06-23T01:00:00Z")), 4);
  assert.equal(nextStreak(7, new Date("2026-06-20T12:00:00Z"), new Date("2026-06-23T12:00:00Z")), 1);
});
