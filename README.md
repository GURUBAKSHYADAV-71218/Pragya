# PRAGYA
Understand the mind. Change the response.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start
    npm run lint

Without Supabase variables the app runs in local mode: data stays in this browser. To use accounts, copy `.env.example` to `.env.local`, fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and run `supabase/schema.sql` in your Supabase project. Guest data on a device is separate from account data.

## Structure
- `app/(app)/*` practice, reflection and learning routes (shared sidebar layout)
- `app/(app)/learn` Explore & Learn: `/learn` board and `/learn/[slug]` guides (public, read-only)
- `lib/learn.ts` typed guide content; `lib/content.ts` exercises, experiments, wisdom
- `lib/repository.ts` storage interface (local + Supabase)

## Tests
    npm test      # recommendation, training-flow and validation unit tests (Node test runner)
    npm run build && npm run lint

## Accounts
Sign-in uses Supabase Auth only. Without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` the login and signup pages say accounts are unavailable and offer guest use; no client-side session is ever created. The app has no protected routes by design: practice works for guests, and data is stored on the device until an account is connected.

## Real accounts with Supabase (setup, in order)
1. Create a free project at supabase.com.
2. SQL editor: paste and run `supabase/schema.sql` (tables plus Row Level Security: every row is private to its owner).
3. Authentication > Providers: keep Email enabled. Authentication > Sign In / Providers > Email: leave "Confirm email" on for production (new users must verify), or off for quick local tests.
4. Authentication > URL Configuration:
   - Site URL: your production URL, for example `https://your-app.vercel.app`
   - Redirect URLs (add all): `http://localhost:3000/**` and `https://your-app.vercel.app/**` (include any preview domain you use). Verification links return to `/login` and password reset links return to `/auth/update-password`.
5. Project Settings > API: copy the Project URL and the `anon` public key into `.env.local` (see `.env.example`). Do not copy the `service_role` key.
6. `npm run dev`, then sign up at `/signup`.
7. Vercel: Project > Settings > Environment Variables: add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Production and Preview, then redeploy.
8. Check privacy with `supabase/rls-check.sql` using two test users.

Sessions use supabase-js in the browser (stored by the library). There are no server-protected routes, because practice is open to guests. Guest data stays on the device; Settings offers a one-time, additive import into an account.
