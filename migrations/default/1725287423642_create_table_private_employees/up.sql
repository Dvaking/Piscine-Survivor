CREATE TABLE "private"."employees" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
