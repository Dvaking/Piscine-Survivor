alter table "private"."events" alter column "total" set default 1;
alter table "private"."events" alter column "total" drop not null;
alter table "private"."events" add column "total" int4;
