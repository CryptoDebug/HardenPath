# Privacy

HardenPath stores the minimum data needed for local accounts and learning progress: email address, password hash, optional display name, quiz and exam attempts, written exam submissions, progress, badges, subscriptions, and security tokens.

## Public profiles

Profiles are private by default. A learner must explicitly choose a public handle and enable the public profile option before appearing in search. Public pages expose only that handle, course milestones, badges, and streak. Email addresses, private names, written submissions, sessions, and account metadata are never part of the public profile query.

## Account control

Authenticated learners can disable their public profile, change their password, and permanently delete their account. Deletion cascades to learning records, attempts, badges, subscriptions, sessions, and account-action tokens.

## Operational data

Rate-limit records contain hashed keys and expire automatically. Application operators remain responsible for database backups, log retention, access controls, privacy notices required in their jurisdiction, and honoring deletion requests in retained backups.
