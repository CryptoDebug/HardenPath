CREATE TYPE "AccountTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

ALTER TABLE "User"
ADD COLUMN "publicHandle" TEXT,
ADD COLUMN "publicProfileEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX "User_publicHandle_key" ON "User"("publicHandle");

CREATE TABLE "AccountActionToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" "AccountTokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccountActionToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AccountActionToken_tokenHash_key" ON "AccountActionToken"("tokenHash");
CREATE INDEX "AccountActionToken_userId_type_expiresAt_idx" ON "AccountActionToken"("userId", "type", "expiresAt");
ALTER TABLE "AccountActionToken" ADD CONSTRAINT "AccountActionToken_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
