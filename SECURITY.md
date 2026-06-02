# Security Policy

HardenPath is a cybersecurity education project, so responsible disclosure matters.

## Reporting a Vulnerability

Please do not open a public issue with exploitable details. Contact the maintainer privately, include a clear description, affected version or commit, reproduction steps in a controlled environment, and suggested mitigation if available.

## Scope

Security reports should focus on HardenPath itself: authentication, authorization, data exposure, dependency risk, deployment configuration, and content that violates the ethical charter.

## Deployment Baseline

- Use a strong `NEXTAUTH_SECRET`.
- Replace default PostgreSQL credentials before public deployment.
- Put the app behind HTTPS.
- Keep dependencies updated and run `npm audit` during maintenance.
- Do not expose the PostgreSQL port publicly unless there is a specific hardened operational reason.

## Educational Safety

HardenPath does not accept content designed to attack real systems without authorization. Offensive techniques must be framed for controlled labs, CTFs, or explicitly authorized environments.
