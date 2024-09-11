alter table "private"."events" alter column "employee_uuid" drop not null;
alter table "private"."events" add column "employee_uuid" uuid;
