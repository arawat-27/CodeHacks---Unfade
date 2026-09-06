-- Run this in the Supabase SQL Editor, then enable the hook in:
-- Authentication > Hooks > Before User Created.
-- Select: public.hook_require_edu_email

create or replace function public.hook_require_edu_email(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  student_email text := lower(event->'user'->>'email');
begin
  if student_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.edu$' then
    return jsonb_build_object('error', jsonb_build_object('message', 'Only email addresses ending in .edu may create an account.', 'http_code', 403));
  end if;
  return '{}'::jsonb;
end;
$$;

grant execute on function public.hook_require_edu_email(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_require_edu_email(jsonb) from anon, authenticated, public;

-- Require a signed-in, email-OTP verified student to submit or upload.
alter table public.submissions add column if not exists owner_id uuid references auth.users(id);
drop policy if exists "anyone can create a submission" on public.submissions;
drop policy if exists "mfa students can create submissions" on public.submissions;
drop policy if exists "edu students can create submissions" on public.submissions;
create policy "edu students can create submissions" on public.submissions for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "students can view their own submissions" on public.submissions;
create policy "students can view their own submissions" on public.submissions for select to authenticated using (owner_id = auth.uid());

drop policy if exists "anyone can upload project media" on storage.objects;
drop policy if exists "mfa students can upload project media" on storage.objects;
drop policy if exists "edu students can upload project media" on storage.objects;
create policy "edu students can upload project media" on storage.objects for insert to authenticated with check (bucket_id = 'project-media');
