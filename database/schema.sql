-- Run once in your Neon database. Each API key is scoped to one user.
CREATE TABLE IF NOT EXISTS hosted_users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS api_keys (key_hash char(64) PRIMARY KEY, user_id uuid NOT NULL REFERENCES hosted_users(id) ON DELETE CASCADE, revoked_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS project_files (user_id uuid NOT NULL REFERENCES hosted_users(id) ON DELETE CASCADE, filename varchar(86) NOT NULL, content text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,filename), CHECK(octet_length(content)<=16384));
