# HoopDebate

Minimal NBA debate app — vote, see results, next debate.

## Setup

1. **Install**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com)
   - In **SQL Editor**, run the full contents of [`supabase.sql`](supabase.sql)
   - Copy **Project URL** and **anon public** key from Settings → API

3. **Env**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

- Import repo, add the same two env vars, deploy.
