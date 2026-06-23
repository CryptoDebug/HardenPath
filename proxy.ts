import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/request-rate-limit";

const TEN_MINUTES = 10 * 60 * 1_000;
const ONE_HOUR = 60 * 60 * 1_000;

function getClientAddress(request: NextRequest) {
  const forwardedAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwardedAddress || request.headers.get("x-real-ip") || "unknown";
}

export function proxy(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const isRegistration = request.nextUrl.pathname === "/api/register";
  const limit = isRegistration ? 5 : 10;
  const windowMs = isRegistration ? ONE_HOUR : TEN_MINUTES;
  const scope = isRegistration ? "registration" : "credentials";
  const result = consumeRateLimit(`${scope}:${getClientAddress(request)}`, limit, windowMs);
  const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1_000));

  if (!result.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", error: "Too many requests." },
      {
        headers: {
          "Cache-Control": "no-store",
          "RateLimit-Limit": String(result.limit),
          "RateLimit-Remaining": "0",
          "RateLimit-Reset": String(Math.ceil(result.resetAt / 1_000)),
          "Retry-After": String(retryAfter)
        },
        status: 429
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set("RateLimit-Limit", String(result.limit));
  response.headers.set("RateLimit-Remaining", String(result.remaining));
  response.headers.set("RateLimit-Reset", String(Math.ceil(result.resetAt / 1_000)));

  return response;
}

export const config = {
  matcher: ["/api/auth/callback/credentials", "/api/register"]
};
