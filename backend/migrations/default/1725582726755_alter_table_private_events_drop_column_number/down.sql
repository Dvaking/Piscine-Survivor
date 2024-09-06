alter table "private"."events" alter column "number" set default nextval('private.events_number_seq'::regclass);
alter table "private"."events" alter column "number" drop not null;
alter table "private"."events" add column "number" int4;
