alter table "public"."employees" alter column "birth_date" drop not null;
alter table "public"."employees" add column "birth_date" date;
