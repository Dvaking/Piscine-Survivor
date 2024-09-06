CREATE TABLE "private"."encounters" ("id" integer NOT NULL, "customer_uuid" uuid, "date" text, "rating" integer, "comment" text, "source" text, PRIMARY KEY ("id") , UNIQUE ("id"));
