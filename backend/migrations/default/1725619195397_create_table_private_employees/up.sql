CREATE TABLE "private"."employees" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" integer NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "email" text NOT NULL, "birth_date" text, "gender" text, "work" text, "image" text, PRIMARY KEY ("uuid") , UNIQUE ("email"), UNIQUE ("uuid"), UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
