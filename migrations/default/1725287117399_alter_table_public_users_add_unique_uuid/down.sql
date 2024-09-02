alter table "public"."users" drop constraint "users_uuid_key";
alter table "public"."users" add constraint "users_email_key" unique ("email");
