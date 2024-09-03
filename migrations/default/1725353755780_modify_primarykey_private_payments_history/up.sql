BEGIN TRANSACTION;
ALTER TABLE "private"."payments_history" DROP CONSTRAINT "payments_history_pkey";

ALTER TABLE "private"."payments_history"
    ADD CONSTRAINT "payments_history_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
