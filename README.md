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

### Requirements

- Node.js 22 or newer
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
- `NEXTAUTH_URL`: public URL of the app, usually `http://localhost:3000` locally.
- `NEXTAUTH_SECRET`: random secret used by NextAuth. Generate a strong one before real use.

### Daily Development

After the first setup, you usually only need:

```bash
docker compose up -d db
npm run dev
```

Run migrations only when the Prisma schema changes:

```bash
npm run db:migrate
```

Run the seed again only when catalog seed data changes or when using a fresh database:

```bash
npm run db:seed
```

### Useful Checks

```bash
npm run lint
npm run build
```

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

For a full local stack:

```bash
docker compose up --build
```

For production, replace `NEXTAUTH_SECRET`, use strong PostgreSQL credentials, and put the app behind HTTPS.

The app service in `docker-compose.yml` connects to PostgreSQL through the internal Docker hostname `db`. Local Prisma commands connect to `localhost:5432` through `DATABASE_URL`.

## Content Model

HardenPath uses a hybrid model:

- Public course structure lives in versioned files under `content/`.
- User data lives in PostgreSQL: accounts, quiz attempts, progress, badges, plans, and subscriptions.

This keeps educational content easy to review and translate while preserving durable user state in the database.

## Ethical Scope

Offensive exercises must stay inside controlled labs, CTFs, or systems with explicit written authorization. HardenPath must not include workflows designed to attack real unauthorized systems.
