CREATE TABLE "public"."users" ("uuid" uuid NOT NULL, "name" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"), UNIQUE ("email"));
