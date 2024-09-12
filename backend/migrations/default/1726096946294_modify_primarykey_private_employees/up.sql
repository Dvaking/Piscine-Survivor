BEGIN TRANSACTION;
ALTER TABLE "private"."employees" DROP CONSTRAINT "employees_pkey";

ALTER TABLE "private"."employees"
    ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("uuid", "id");
COMMIT TRANSACTION;
