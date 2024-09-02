CREATE TABLE "private"."customers" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "description" text NOT NULL, "astrological_sign" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
