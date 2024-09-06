alter table "private"."employees" alter column "image" drop not null;
alter table "private"."employees" add column "image" text;
