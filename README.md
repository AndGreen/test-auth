# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# Auth Service

## Features
- Signup with first name, last name, email, and password
- Email confirmation required before login
- Login with email and password
- Password reset (sends email, redirects to update password page)
- PostgreSQL + Drizzle ORM + Elysia + Better Auth

## Setup

1. **Install dependencies**
   ```sh
   bun install
   ```

2. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   ```
   Replace with your actual PostgreSQL credentials.

3. **Run database migrations**
   (You can use Drizzle Kit or your preferred migration tool to create the `users` table as defined in `src/schema.ts`.)

4. **Run the server**
   ```sh
   bun run src/index.ts
   ```

## Email Sending
- The current setup logs emails to the console. Integrate with your provider (e.g., Resend, SendGrid, SES) in `src/auth.ts`.

## Endpoints
- `POST /auth/api/sign-up` — Signup (firstName, lastName, email, password)
- `POST /auth/api/sign-in` — Login (email, password)
- `POST /auth/api/forget-password` — Send password reset email
- `POST /auth/api/reset-password` — Reset password (with token)

All endpoints require email confirmation before login.