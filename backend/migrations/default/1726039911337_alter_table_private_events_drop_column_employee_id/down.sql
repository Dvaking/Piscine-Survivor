alter table "private"."events" alter column "employee_id" drop not null;
alter table "private"."events" add column "employee_id" int4;
