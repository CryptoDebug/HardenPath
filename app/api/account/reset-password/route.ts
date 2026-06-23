import { hash } from "bcryptjs";
import { AccountTokenType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashActionToken, passwordSchema } from "@/lib/account-security";
import { prisma } from "@/lib/db";

const schema = z.object({ password: passwordSchema, token: z.string().min(20).max(200) });

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid token or password." }, { status: 400 });

  const tokenHash = hashActionToken(parsed.data.token);
  const token = await prisma.accountActionToken.findUnique({ where: { tokenHash } });
  if (!token || token.type !== AccountTokenType.PASSWORD_RESET || token.usedAt || token.expiresAt <= new Date()) {
    return NextResponse.json({ error: "This reset link is invalid or expired." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: token.userId },
      data: { passwordHash: await hash(parsed.data.password, 12), sessionVersion: { increment: 1 } }
    }),
    prisma.accountActionToken.update({ where: { id: token.id }, data: { usedAt: new Date() } })
  ]);
  return new NextResponse(null, { status: 204 });
}
