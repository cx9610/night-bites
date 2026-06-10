create extension if not exists "pgcrypto";

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  creator_device_id text not null,
  creator_nickname text not null,
  office_location text not null,
  destination text not null,
  meeting_time timestamptz not null,
  meeting_place text not null,
  status text not null default 'open'
    check (status in ('open', 'departed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  device_id text not null,
  nickname text not null,
  created_at timestamptz not null default now(),
  unique (invitation_id, device_id)
);

alter table public.invitations enable row level security;
alter table public.participants enable row level security;

create policy "public read invitations" on public.invitations
  for select using (true);

create policy "public create invitations" on public.invitations
  for insert with check (true);

create policy "public read participants" on public.participants
  for select using (true);

create policy "public join invitations" on public.participants
  for insert with check (true);
