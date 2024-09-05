alter table "private"."clothe" alter column "customer_uuid" drop not null;
alter table "private"."clothe" add column "customer_uuid" text;
