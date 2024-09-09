alter table "private"."clothes" alter column "image" drop not null;
alter table "private"."clothes" add column "image" text;
