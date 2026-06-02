# HardenPath

HardenPath is an original open source project by CryptoDebug: a bilingual French/English platform for learning cybersecurity progressively, ethically, and practically.

The product goal is to combine structured courses, controlled labs, quizzes, user progress, badges, levels, and a freemium model without relying on unreadable cyberpunk clichés. The platform is designed for self-hosting on a Raspberry Pi, a home server, or a dedicated server.

## Features

- Next.js App Router with TypeScript
- Tailwind CSS professional dark interface
- French/English i18n with server detection and persistent navbar switch
- Versioned course catalog with localized content
- PostgreSQL schema prepared with Prisma
- Local user accounts through NextAuth credentials
- Progress, quizzes, badges, plans, and subscriptions data model
- Docker Compose for self-hosting
- Clear ethical charter for legal, authorized learning

## Licensing

- Source code: AGPL-3.0-only
- Educational content in `content/`: CC BY-SA 4.0

When reusing or deploying HardenPath publicly, credit the original project as:

> HardenPath, original project by CryptoDebug.

Contributions are welcome when they preserve the legal, ethical, and educational intent of the project.

## Getting Started

```bash
npm install
cp .env.example .env
docker compose up -d db
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Generate a strong `NEXTAUTH_SECRET` before using the app seriously:

```bash
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

Put the generated value in `.env`.

## Self-Hosting

For a full local stack:

```bash
docker compose up --build
```

Docker Compose reads `.env` automatically. For production, replace `NEXTAUTH_SECRET`, use strong PostgreSQL credentials, and put the app behind HTTPS.

## Content Model

HardenPath uses a hybrid model:

- Public course structure lives in versioned files under `content/`.
- User data lives in PostgreSQL: accounts, quiz attempts, progress, badges, plans, and subscriptions.

This keeps educational content easy to review and translate while preserving durable user state in the database.

## Ethical Scope

Offensive exercises must stay inside controlled labs, CTFs, or systems with explicit written authorization. HardenPath must not include workflows designed to attack real unauthorized systems.
