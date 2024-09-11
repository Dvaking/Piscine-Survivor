CREATE TABLE "private"."eventCustomers" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "event_uuid" uuid NOT NULL, "customer_uuid" uuid NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
