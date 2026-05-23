-- Paste this in Supabase SQL Editor (Dashboard → SQL → New query)

create table public.debates (
  id           uuid primary key default gen_random_uuid(),
  question     text not null,
  option_left  text not null,
  option_right text not null,
  votes_left   int not null default 0,
  votes_right  int not null default 0,
  sort_order   int not null default 0
);

alter table public.debates enable row level security;

create policy "read" on public.debates for select using (true);

grant select on public.debates to anon;

create or replace function public.cast_vote(p_id uuid, p_side text)
returns table (votes_left int, votes_right int)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_side = 'left' then
    update public.debates d
      set votes_left = d.votes_left + 1
      where d.id = p_id;
  else
    update public.debates d
      set votes_right = d.votes_right + 1
      where d.id = p_id;
  end if;
  return query
    select d.votes_left, d.votes_right
    from public.debates d
    where d.id = p_id;
end;
$$;

grant execute on function public.cast_vote to anon;

insert into public.debates (question, option_left, option_right, sort_order) values
  ('Jordan or LeBron?', 'Jordan', 'LeBron', 1),
  ('Shaq or Hakeem?', 'Shaq', 'Hakeem', 2),
  ('Kobe or Wade?', 'Kobe', 'Wade', 3),
  ('Curry or Dame?', 'Curry', 'Dame', 4),
  ('Magic or Bird?', 'Magic', 'Bird', 5),
  ('Durant or Giannis?', 'Durant', 'Giannis', 6),
  ('Tim Duncan or Dirk?', 'Duncan', 'Dirk', 7),
  ('Allen Iverson or Kyrie?', 'Iverson', 'Kyrie', 8);
