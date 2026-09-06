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
alter table public.submissions add column if not exists creator_name text;
drop policy if exists "anyone can create a submission" on public.submissions;
drop policy if exists "mfa students can create submissions" on public.submissions;
drop policy if exists "edu students can create submissions" on public.submissions;
create policy "edu students can create submissions" on public.submissions for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "students can view their own submissions" on public.submissions;
create policy "students can view their own submissions" on public.submissions for select to authenticated using (owner_id = auth.uid());
drop policy if exists "approved submissions are public" on public.submissions;
create policy "approved submissions are public" on public.submissions for select to anon, authenticated using (status = 'approved');

-- Keep a removal reason instead of permanently deleting a project.
alter table public.submissions add column if not exists removal_reason text;
alter table public.submissions add column if not exists removed_by uuid references auth.users(id);
alter table public.submissions add column if not exists removed_at timestamptz;
alter table public.submissions drop constraint if exists submissions_status_check;
alter table public.submissions add constraint submissions_status_check check (status in ('pending', 'approved', 'rejected', 'removed'));

create or replace function public.withdraw_submission(submission_id uuid, reason text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if coalesce(length(trim(reason)), 0) = 0 then raise exception 'Please provide a reason for removing this project.'; end if;
  update public.submissions set status = 'removed', removal_reason = trim(reason), removed_by = auth.uid(), removed_at = now()
  where id = submission_id and owner_id = auth.uid();
  if not found then raise exception 'You can only remove your own project.'; end if;
end;
$$;
revoke all on function public.withdraw_submission(uuid, text) from public;
grant execute on function public.withdraw_submission(uuid, text) to authenticated;

drop policy if exists "anyone can upload project media" on storage.objects;
drop policy if exists "mfa students can upload project media" on storage.objects;
drop policy if exists "edu students can upload project media" on storage.objects;
create policy "edu students can upload project media" on storage.objects for insert to authenticated with check (bucket_id = 'project-media');
