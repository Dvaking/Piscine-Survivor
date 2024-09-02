CREATE TABLE "public"."encounters" ("uuid" uuid NOT NULL, "customer_uuid" uuid NOT NULL, "date" text NOT NULL, "rating" integer NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
