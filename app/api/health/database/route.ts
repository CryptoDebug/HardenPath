import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return new NextResponse(null, {
      headers: {
        "Cache-Control": "no-store"
      },
      status: 204
    });
  } catch (error) {
    console.error("Database health check failed", error);

    return NextResponse.json(
      { code: "DATABASE_UNAVAILABLE" },
      {
        headers: {
          "Cache-Control": "no-store"
        },
        status: 503
      }
    );
  }
}
