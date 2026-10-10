-- Run in the Supabase SQL editor. Every table is private to its owner via Row Level Security.
create table profiles (id uuid primary key references auth.users on delete cascade, name text default '', tz text, preferred_time text, mind_state jsonb, created_at timestamptz default now());
create table assessment_results (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, primary_focus text, secondary_focus text, scores jsonb, created_at timestamptz default now());
create table exercise_sessions (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, type text not null, minutes numeric default 0, detail text, created_at timestamptz default now());
create table experiment_results (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, experiment text not null, minutes numeric default 0, detail text, created_at timestamptz default now());
create table reflections (id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users on delete cascade, title text, body text not null, category text default 'General', created_at timestamptz default now());
create table user_settings (user_id uuid primary key references auth.users on delete cascade, settings jsonb default '{}');
create view practice_history with (security_invoker = true) as
  select id, user_id, type, minutes, detail, created_at, 'exercise' as kind from exercise_sessions
  union all select id, user_id, experiment, minutes, detail, created_at, 'experiment' from experiment_results;

do $$ declare t text; begin
  foreach t in array array['assessment_results','exercise_sessions','experiment_results','reflections','user_settings'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "own rows" on %I for all using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))', t);
  end loop;
end $$;
alter table profiles enable row level security;
create policy "own profile" on profiles for all using (id = (select auth.uid())) with check (id = (select auth.uid()));
