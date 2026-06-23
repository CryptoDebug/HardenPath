import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ code: "INVALID_PAYLOAD", error: "Invalid registration payload." }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email }
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

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration database error", error);
    return NextResponse.json({ code: "DATABASE_UNAVAILABLE", error: "The account database is unavailable." }, { status: 503 });
  }
}
