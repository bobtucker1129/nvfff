-- ============================================================
-- NVFFF — Initial Schema
-- Run this in Supabase → SQL Editor
-- ============================================================

-- Rods
create table public.rods (
  id text primary key,                    -- e.g. R-001
  user_id uuid references auth.users(id) on delete cascade,
  brand text not null,
  model text,
  length_ft numeric,
  line_weight int,
  weight_oz numeric,
  condition text check (condition in ('excellent', 'good', 'fair', 'poor')),
  est_value_usd numeric,
  notes text,
  created_at timestamptz default now()
);

-- Reels
create table public.reels (
  id text primary key,                    -- e.g. RL-001
  user_id uuid references auth.users(id) on delete cascade,
  brand text not null,
  model text,
  line_weight int,
  arbor text,
  condition text check (condition in ('excellent', 'good', 'fair', 'poor')),
  est_value_usd numeric,
  notes text,
  created_at timestamptz default now()
);

-- Gear (waders, vests, etc.)
create table public.gear (
  id text primary key,                    -- e.g. G-001
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,                     -- waders, vest, net, etc.
  brand text,
  description text,
  condition text check (condition in ('excellent', 'good', 'fair', 'poor')),
  notes text,
  created_at timestamptz default now()
);

-- Locations (honey holes)
create table public.locations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  lat double precision not null,
  lng double precision not null,
  parking text,
  access text,
  trail_distance text,
  conditions text,
  notes text,
  created_by uuid references auth.users(id) on delete cascade,
  is_public boolean default false,
  created_at timestamptz default now()
);

-- Catches
create table public.catches (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  photo_url text,
  lat double precision not null,
  lng double precision not null,
  fish_species text,
  fish_length_inches numeric,
  notes text,
  is_public boolean default false,
  caught_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ── Row-Level Security ──────────────────────────────────────
alter table public.rods enable row level security;
alter table public.reels enable row level security;
alter table public.gear enable row level security;
alter table public.locations enable row level security;
alter table public.catches enable row level security;

-- Rods: users see/edit only their own
create policy "Own rods" on public.rods for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Reels: users see/edit only their own
create policy "Own reels" on public.reels for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Gear: users see/edit only their own
create policy "Own gear" on public.gear for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Locations: public ones visible to all, private only to owner
create policy "Public locations viewable" on public.locations for select using (is_public = true);
create policy "Own locations" on public.locations for all using (auth.uid() = created_by) with check (auth.uid() = created_by);

-- Catches: public ones visible to all, private only to owner
create policy "Public catches viewable" on public.catches for select using (is_public = true);
create policy "Own catches" on public.catches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
