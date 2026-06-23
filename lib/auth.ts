import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { normalizeEmail } from "@/lib/account-security";

const credentialsSchema = z.object({
  email: z.string().email().transform(normalizeEmail),
  password: z.string().min(8)
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/account"
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: { equals: parsed.data.email, mode: "insensitive" } },
          orderBy: { createdAt: "asc" }
        });

        if (!user?.passwordHash) {
          return null;
        }

        if (process.env.REQUIRE_EMAIL_VERIFICATION === "true" && !user.emailVerified) {
          return null;
        }

        const isValid = await compare(parsed.data.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          sessionVersion: user.sessionVersion
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sessionVersion = user.sessionVersion ?? 0;
        token.invalid = false;
      } else if (token.id) {
        const current = await prisma.user.findUnique({
          where: { id: token.id },
          select: { sessionVersion: true }
        });

        if (!current || current.sessionVersion !== token.sessionVersion) {
          token.id = undefined;
          token.invalid = true;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.id && !token.invalid) {
        session.user.id = String(token.id);
      } else if (session.user) {
        session.user.id = "";
      }
      return session;
    }
  }
};
