# Contributing to HardenPath

Thank you for helping improve HardenPath.

## Workflow

Use conventional commits with one logical change per commit:

```text
feat(app): initialize hardenpath web app
feat(i18n): add french and english localization
feat(auth): add user accounts
feat(courses): add course content model
feat(progress): track lesson completion
feat(quizzes): add quiz attempts and scoring
feat(badges): add badge progression system
feat(billing): prepare freemium subscription schema
docs(readme): add project overview and attribution guide
docs(contributing): add contribution workflow
```

## Content Rules

- Keep lessons bilingual when possible.
- Prefer official resources and standards.
- Mark premium material clearly.
- Keep offensive material limited to authorized labs, CTFs, and isolated environments.
- Do not add instructions for attacking unauthorized real systems.

## Code Rules

- Keep TypeScript strict.
- Follow existing folder boundaries.
- Add database fields through Prisma migrations.
- Keep user data in PostgreSQL and public learning content in versioned files.

## Attribution

HardenPath is an original project by CryptoDebug. Public forks and deployments should keep visible attribution to the original project.
