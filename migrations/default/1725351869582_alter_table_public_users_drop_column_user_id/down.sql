alter table "public"."users" alter column "user_id" drop not null;
alter table "public"."users" add column "user_id" int4;
