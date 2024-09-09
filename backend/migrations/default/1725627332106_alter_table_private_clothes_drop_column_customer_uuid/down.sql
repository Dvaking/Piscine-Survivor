alter table "private"."clothes" alter column "customer_uuid" drop not null;
alter table "private"."clothes" add column "customer_uuid" uuid;
