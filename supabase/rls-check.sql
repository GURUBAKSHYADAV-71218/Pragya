-- Manual check that users cannot read each other's rows. Run in the Supabase SQL editor after creating two test users.
-- 1) Replace the UUIDs with real user ids from Authentication > Users.
-- 2) Each query should return only that user's rows, and the cross-user insert should fail.
begin;
  set local role authenticated;
  select set_config('request.jwt.claims', '{"sub":"USER-A-UUID","role":"authenticated"}', true);
  select count(*) as a_sees_own from reflections;                                  -- rows owned by A only
  select count(*) as a_sees_b from reflections where user_id = 'USER-B-UUID';     -- expect 0
  insert into reflections (user_id, body) values ('USER-B-UUID', 'should fail');   -- expect RLS violation
rollback;
