import { AccountTokenType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createActionToken, isEmailConfigured } from "@/lib/account-security";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!isEmailConfigured()) return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { email: true, emailVerified: true } });
  if (!user?.email || user.emailVerified) return new NextResponse(null, { status: 204 });

  const { token } = await createActionToken(session.user.id, AccountTokenType.EMAIL_VERIFICATION, 24 * 60 * 60 * 1_000);
  await sendVerificationEmail(user.email, token);
  return new NextResponse(null, { status: 204 });
}
