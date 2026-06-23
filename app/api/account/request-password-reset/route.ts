import { AccountTokenType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createActionToken, isEmailConfigured, normalizeEmail } from "@/lib/account-security";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { consumeRateLimit } from "@/lib/request-rate-limit";

const schema = z.object({ email: z.string().email().transform(normalizeEmail) });
const accepted = () => NextResponse.json({ accepted: true }, { status: 202 });

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return accepted(); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return accepted();

  const limit = await consumeRateLimit(`password-reset:${parsed.data.email}`, 3, 60 * 60 * 1_000);
  if (!limit.allowed || !isEmailConfigured()) return accepted();

  const user = await prisma.user.findFirst({ where: { email: { equals: parsed.data.email, mode: "insensitive" } }, select: { email: true, id: true } });
  if (user?.email) {
    try {
      const { token } = await createActionToken(user.id, AccountTokenType.PASSWORD_RESET, 60 * 60 * 1_000);
      await sendPasswordResetEmail(user.email, token);
    } catch (error) {
      console.error("Password reset email could not be sent", error);
    }
  }
  return accepted();
}
