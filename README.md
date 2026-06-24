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

Privacy behavior and operator responsibilities are documented in [`PRIVACY.md`](PRIVACY.md).

## Getting Started

### Requirements

- Node.js 22.13 or newer (or Node.js 24+)
- npm
- Docker Desktop or another Docker Compose compatible runtime
- Git

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

On Windows PowerShell, use this command instead of `cp`:

```powershell
Copy-Item .env.example .env
```

### Environment Variables

Docker Compose reads `.env` automatically. The same file is also used by Prisma and Next.js when running locally.

Required variables:

- `DATABASE_URL`: PostgreSQL connection string used by Prisma and the app.
- `POSTGRES_DB`: database name created by Docker Compose.
- `POSTGRES_USER`: PostgreSQL user created by Docker Compose.
- `POSTGRES_PASSWORD`: PostgreSQL password. Change it for production.
- `POSTGRES_PORT`: host port used for local PostgreSQL access (defaults to `5433`).
- `NEXTAUTH_URL`: public URL of the app, usually `http://localhost:3000` locally.
- `NEXTAUTH_SECRET`: random secret used by NextAuth. Generate a strong one before real use.

When accessing the development server through another network interface, set
`ALLOWED_DEV_ORIGINS` to a comma-separated list of hostnames or IP addresses.

### Daily Development

After the first setup, you usually only need:

```bash
docker compose up -d db
npm run dev
```

Open `http://localhost:3000`.

In development mode, the first request to a page can be slow because Next.js compiles that route on demand. This is expected and does not represent production performance.

Run migrations only when the Prisma schema changes:

```bash
npm run db:migrate
```

Run the seed again only when catalog seed data changes or when using a fresh database:

```bash
npm run db:seed
```

Course pages require a user account so progress, quiz attempts, and completions can be stored in PostgreSQL instead of being simulated in the UI.

### Useful Checks

```bash
npm run lint
npm test
npm run build
```

### Local Production Mode

To test the app closer to a deployed environment:

```bash
docker compose up -d db
npm run build
npm run start
```

Open `http://localhost:3000`.

In production mode, pages are compiled during `npm run build`, so requests should not pay the same first-page compilation cost as `npm run dev`.

### Cleanup

These folders are generated and can be removed safely:

```bash
rm -rf .next node_modules
```

On Windows PowerShell:

```powershell
Remove-Item .next -Recurse -Force
Remove-Item node_modules -Recurse -Force
```

Reinstall dependencies with `npm install`.

## Self-Hosting

For a full local stack, including automatic migrations and idempotent catalog seeding:

```bash
docker compose up --build
```

Docker Compose now refuses to start without `POSTGRES_PASSWORD` and `NEXTAUTH_SECRET`. For production deployment, use unique strong values, put the app behind HTTPS, and set `TRUST_PROXY=true` only when the proxy overwrites forwarded-address headers.

Optional account verification and password-reset email uses the Resend HTTP API. Set `RESEND_API_KEY`, `EMAIL_FROM`, and `REQUIRE_EMAIL_VERIFICATION=true` after verifying the sender domain. Without these variables, local accounts remain usable and the email delivery actions stay disabled.

Run the complete local verification suite with:

```bash
npm test
npm run test:integration
npm run test:e2e
```

Integration tests require a migrated and seeded PostgreSQL database. End-to-end tests install Chromium once with `npx playwright install chromium`.

The app service in `docker-compose.yml` connects to PostgreSQL through the internal Docker hostname `db`. Local Prisma commands connect to `localhost:5433` by default through `DATABASE_URL`; change both `POSTGRES_PORT` and `DATABASE_URL` together if you need another host port.

## Content Model

HardenPath uses a hybrid model:

- Public course structure lives in versioned files under `content/`.
- User data lives in PostgreSQL: accounts, quiz attempts, progress, badges, plans, and subscriptions.

This keeps educational content easy to review and translate while preserving durable user state in the database.

## Ethical Scope

Offensive exercises must stay inside controlled labs, CTFs, or systems with explicit written authorization. HardenPath must not include workflows designed to attack real unauthorized systems.
