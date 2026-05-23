-- Run this once in Supabase SQL Editor to fix "Vote failed"

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

grant execute on function public.cast_vote(uuid, text) to anon;
