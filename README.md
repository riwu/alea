# Setup

## Mobile

- Create `env.js`
- `yarn install`

## Server

- `yarn install`
- Set environment variable

  - `SESSION_SECRET`: secret key for passport session
  - `REDIS_DATABASE_INDEX`: Redis (used for session management) database index

  - `AWS_ACCESS_KEY_ID`: AWS Access Key ID (with SES enabled)
  - `AWS_SECRET_ACCESS_KEY`: AWS Secret Access Key (with SES enabled)
  - `AWS_SES_REGION`

  - `MYSQL_HOST`
  - `MYSQL_USER`
  - `MYSQL_PORT`
  - `MYSQL_PASSWORD`
