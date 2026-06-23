import { compare } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({ password: z.string().min(1).max(128), confirmation: z.literal("DELETE") });

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Deletion confirmation is invalid." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { passwordHash: true } });
  if (!user?.passwordHash || !(await compare(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Password is incorrect." }, { status: 403 });
  }

  await prisma.user.delete({ where: { id: session.user.id } });
  return new NextResponse(null, { status: 204 });
}
