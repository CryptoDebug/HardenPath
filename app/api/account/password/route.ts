import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { passwordSchema } from "@/lib/account-security";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({ currentPassword: z.string().min(1).max(128), newPassword: passwordSchema });

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "The new password does not meet requirements." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { passwordHash: true } });
  if (!user?.passwordHash || !(await compare(parsed.data.currentPassword, user.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: await hash(parsed.data.newPassword, 12), sessionVersion: { increment: 1 } }
  });
  return new NextResponse(null, { status: 204 });
}
