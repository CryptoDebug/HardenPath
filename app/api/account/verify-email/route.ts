import { AccountTokenType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashActionToken } from "@/lib/account-security";
import { prisma } from "@/lib/db";

const schema = z.object({ token: z.string().min(20).max(200) });

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const token = await prisma.accountActionToken.findUnique({ where: { tokenHash: hashActionToken(parsed.data.token) } });
  if (!token || token.type !== AccountTokenType.EMAIL_VERIFICATION || token.usedAt || token.expiresAt <= new Date()) {
    return NextResponse.json({ error: "This verification link is invalid or expired." }, { status: 400 });
  }

  const now = new Date();
  await prisma.$transaction([
    prisma.user.update({ where: { id: token.userId }, data: { emailVerified: now } }),
    prisma.accountActionToken.update({ where: { id: token.id }, data: { usedAt: now } })
  ]);
  return new NextResponse(null, { status: 204 });
}
