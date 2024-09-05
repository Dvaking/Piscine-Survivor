CREATE TABLE "public"."users" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "email" Text NOT NULL, "password" text NOT NULL, "employee_uuid" uuid, "customer_uuid" uuid, PRIMARY KEY ("uuid") , UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
