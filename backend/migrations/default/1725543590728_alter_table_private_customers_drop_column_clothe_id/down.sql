alter table "private"."customers" alter column "clothe_id" drop not null;
alter table "private"."customers" add column "clothe_id" int4;
