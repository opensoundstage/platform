# OpenSoundstage Hosted API — starter

This extends the existing website with Netlify serverless functions. The local browser SANDBOX stays free and offline-capable. **No billing or signup is included.** The website has NOT yet been wired to these endpoints; they are for future app/cloud clients.

## Endpoints
- `GET /api/health` public status
- `GET /api/projects` list your files
- `PUT /api/projects` save `{ "filename": "HELLO.build", "content": "PUT NEW \"Hello\"" }`
- `GET /api/file?name=HELLO.build` read your file
- `DELETE /api/file?name=HELLO.build` delete your file

All endpoints except health require `Authorization: Bearer oss_<random key>`. Do NOT put API keys in public website JavaScript. A production mobile/desktop app should use a secure login/token flow; this API-key starter is for private development and testing.

## Setup
1. Create Neon Postgres and execute `database/schema.sql`.
2. In Netlify, set `DATABASE_URL` as a secret environment variable.
3. Install dependencies with `npm install` and deploy via Git-connected Netlify build.
4. For private testing, create a user in `hosted_users`, generate a cryptographically random key beginning `oss_` followed by at least 32 URL-safe characters, SHA-256 hash the **full key**, and insert the hash and user ID into `api_keys`. Never store plaintext keys in the database.
5. Test `GET /api/health`, then authenticated endpoints.

## Security / limitations
- Enforces 16 KB/file, 64 files/account, 256 KB/account, restricted filenames, control-character and line checks, and account-scoped database queries.
- Browser interpreter independently validates full BUILD/ GRAIN syntax and execution budgets. The server does **not** execute uploaded BUILD code.
- These limits prevent routine oversized uploads but do not by themselves eliminate injection or denial-of-service risk. Add rate limiting, authentication with short-lived tokens, monitoring, tests, and transactional quota enforcement before public launch. Concurrent saves can currently race against the total-workspace quota.
- Netlify function routing assumes current Netlify Functions support for exported `config.path`.
- No subscriptions, app purchases, payments, or entitlement verification yet.
