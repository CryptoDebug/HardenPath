import { hash } from "bcryptjs";
import { AccountTokenType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createActionToken, isEmailConfigured, normalizeEmail, passwordSchema } from "@/lib/account-security";
import { sendVerificationEmail } from "@/lib/email";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().transform(normalizeEmail),
  password: passwordSchema
});

export async function POST(request: Request) {
  if (process.env.REQUIRE_EMAIL_VERIFICATION === "true" && !isEmailConfigured()) {
    return NextResponse.json({ code: "EMAIL_UNAVAILABLE", error: "Email verification is required but delivery is not configured." }, { status: 503 });
  }
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ code: "INVALID_PAYLOAD", error: "Invalid JSON." }, { status: 400 }); }
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ code: "INVALID_PAYLOAD", error: "Invalid registration payload." }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { email: { equals: parsed.data.email, mode: "insensitive" } }
    });

    if (existing) {
      return NextResponse.json({ code: "ACCOUNT_EXISTS", error: "A user already exists with this email." }, { status: 409 });
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    let verificationSent = false;
    if (isEmailConfigured() && user.email) {
      try {
        const { token } = await createActionToken(user.id, AccountTokenType.EMAIL_VERIFICATION, 24 * 60 * 60 * 1_000);
        verificationSent = await sendVerificationEmail(user.email, token);
      } catch (error) {
        console.error("Verification email could not be sent", error);
      }
    }

    return NextResponse.json({ user, verificationRequired: process.env.REQUIRE_EMAIL_VERIFICATION === "true", verificationSent }, { status: 201 });
  } catch (error) {
    console.error("Registration database error", error);
    return NextResponse.json({ code: "DATABASE_UNAVAILABLE", error: "The account database is unavailable." }, { status: 503 });
  }
}
