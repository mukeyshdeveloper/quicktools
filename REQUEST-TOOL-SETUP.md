# Request a Tool Feature — Setup Guide

This feature allows users to request new tools. It saves requests to a database and sends you (the admin) an email notification.

Everything is **free** using generous free tiers.

## Recommended Free Stack

| Service       | Purpose                  | Free Tier                                      | Recommended? |
|---------------|--------------------------|------------------------------------------------|--------------|
| **Supabase**  | Database (Postgres)      | 500MB DB + generous bandwidth                  | Yes (Best)   |
| **Resend**    | Email sending            | 3,000 emails/month                             | Yes          |
| **Upstash Redis** | Rate limiting        | 10,000 requests/day                            | Yes          |
| **Google reCAPTCHA** | Spam protection   | Completely free                                | Yes          |

This combination works extremely well with Vercel + Next.js and keeps everything free.

---

## Step 1: Supabase Setup (Database)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Create a new project.
3. Once the project is ready, go to **SQL Editor** and run this query:

```sql
-- 1. Create the table (run this if you haven't already)
create table if not exists tool_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  tool_name text not null,
  description text not null,
  category text,
  additional_notes text,
  created_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security
alter table tool_requests enable row level security;

-- 3. Allow anonymous users to INSERT (this fixes the "violates row-level security policy" error)
create policy "Allow public inserts for tool requests"
on tool_requests
for insert
to anon
with check (true);

-- 4. (Strongly recommended) Prevent anonymous users from reading other requests
create policy "Block public reads on tool_requests"
on tool_requests
for select
to anon
using (false);
```

4. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key

5. Add these to your `.env.local` and Vercel Environment Variables:

```env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

> **Important:** If you are seeing the "new row violates row-level security policy" error right now, just copy and run **only the two `create policy` statements** (steps 3 and 4) in the SQL Editor. You do **not** need to drop the table.

---

## Step 2: Resend Setup (Email Notifications)

1. Go to [resend.com](https://resend.com) and create a free account.
2. Verify your domain (or use their test domain `onboarding@resend.dev` during development).
3. Get your API key from the dashboard.
4. Add this to your environment variables:

```env
RESEND_API_KEY=re_xxxxxxxx
ADMIN_EMAIL=your-email@gmail.com     # Where you want to receive notifications
```

> **Note**: On the free plan you can send 3,000 emails per month. This is more than enough for tool requests.

---

## Step 3: Upstash Redis Setup (Rate Limiting)

To prevent spam, we use rate limiting with Upstash Redis (free tier).

1. Go to [upstash.com](https://upstash.com) and create a free account.
2. Create a new Redis database (choose the region closest to you).
3. Copy the **REST URL** and **REST TOKEN** from the dashboard.
4. Add to environment variables:

```env
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

This allows 3 requests per hour per (IP + email) combination by default.

---

## Step 4: Google reCAPTCHA Setup (Spam Protection)

We use reCAPTCHA v3 (invisible, best UX).

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create).
2. Choose **reCAPTCHA v3**.
3. Add your domain (e.g., `yourdomain.com` and `localhost` for testing).
4. Copy:
   - **Site Key** (public, starts with the frontend)
   - **Secret Key** (private, for backend)

5. Add to environment variables:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

---

## Step 5: Add Environment Variables on Vercel

Go to your Vercel project → Settings → Environment Variables and add:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

**Important**: After adding, redeploy the project.

---

## Step 6: (Optional) Make the Form Look Better

The current form already uses your existing design system. You can later add:

- Admin dashboard to view requests (protected route)
- Email confirmation to the user
- Better spam protection (e.g., honeypot field)

---

## Testing

1. Go to `/request-tool`
2. Fill the form
3. Submit
4. Check your email (the one in `ADMIN_EMAIL`)
5. Check your Supabase table (`tool_requests`)

---

## Alternative (If You Want Zero Extra Services)

If you don't want to use Supabase + Resend + Upstash, you can use:

- **Vercel Postgres** (limited free tier) + Resend
- **Formspree** or **Tally.so** (for form handling + email + some rate limiting)

But the current stack (Supabase + Resend + Upstash + reCAPTCHA) is currently the best free developer experience for production use on Vercel.

Let me know if you want me to switch to a different stack or add more features (like an admin view)!
