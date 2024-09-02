CREATE TABLE "public"."users" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
