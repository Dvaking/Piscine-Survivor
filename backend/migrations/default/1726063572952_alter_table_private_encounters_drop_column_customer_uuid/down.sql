alter table "private"."encounters" alter column "customer_uuid" drop not null;
alter table "private"."encounters" add column "customer_uuid" uuid;
