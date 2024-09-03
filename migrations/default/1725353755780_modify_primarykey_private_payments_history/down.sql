alter table "private"."payments_history" drop constraint "payments_history_pkey";
alter table "private"."payments_history"
    add constraint "payments_history_pkey"
    primary key ("uuid");
