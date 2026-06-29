# Easybet Welcome Offer — Setup Guide

## Supabase Setup (Newsletter)

1. Go to [supabase.com](https://supabase.com) and create a free project.

2. In the **SQL Editor**, run this to create the subscribers table:

```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- Allow public inserts (anon key only, no reads)
alter table newsletter_subscribers enable row level security;

create policy "Allow anonymous inserts"
on newsletter_subscribers for insert
to anon
with check (true);
```

3. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`

4. Create a `.env` file in the project root (copy from `.env.example`) and paste your values.

## Vercel Deployment

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in **Vercel → Settings → Environment Variables**.
4. Deploy!

## Local Development

```bash
npm install
cp .env.example .env   # fill in your Supabase values
npm run dev
```
