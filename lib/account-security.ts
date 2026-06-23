import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { AccountTokenType } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const passwordSchema = z
  .string()
  .min(12)
  .max(128)
  .regex(/[A-Za-z]/, "A letter is required.")
  .regex(/\d/, "A number is required.");

export const publicHandleSchema = z
  .string()
  .trim()
  .min(3)
  .max(32)
  .regex(/^[a-zA-Z0-9_-]+$/)
  .transform((value) => value.toLowerCase());

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashActionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createActionToken(userId: string, type: AccountTokenType, ttlMs: number) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + ttlMs);

  await prisma.$transaction([
    prisma.accountActionToken.deleteMany({ where: { type, userId, usedAt: null } }),
    prisma.accountActionToken.create({
      data: { expiresAt, tokenHash: hashActionToken(token), type, userId }
    })
  ]);

  return { expiresAt, token };
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}
