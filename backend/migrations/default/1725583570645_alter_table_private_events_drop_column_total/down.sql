alter table "private"."events" alter column "total" set default nextval('private.events_total_seq'::regclass);
alter table "private"."events" alter column "total" drop not null;
alter table "private"."events" add column "total" int4;
