alter table "private"."employees" drop constraint "employees_pkey";
alter table "private"."employees"
    add constraint "employees_pkey"
    primary key ("uuid");
