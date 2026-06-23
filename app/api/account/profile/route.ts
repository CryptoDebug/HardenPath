import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { publicHandleSchema } from "@/lib/account-security";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const profileSchema = z.object({
  publicHandle: z.union([publicHandleSchema, z.literal("")]),
  publicProfileEnabled: z.boolean()
}).superRefine((value, context) => {
  if (value.publicProfileEnabled && !value.publicHandle) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "A public handle is required.", path: ["publicHandle"] });
  }
});

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid profile settings." }, { status: 400 });

  try {
    const profile = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        publicHandle: parsed.data.publicHandle || null,
        publicProfileEnabled: parsed.data.publicProfileEnabled
      },
      select: { publicHandle: true, publicProfileEnabled: true }
    });
    return NextResponse.json({ profile });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "This public handle is already used." }, { status: 409 });
    }
    throw error;
  }
}
