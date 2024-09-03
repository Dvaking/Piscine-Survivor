alter table "private"."payments_history" alter column "uuid" drop not null;
alter table "private"."payments_history" add column "uuid" uuid;
