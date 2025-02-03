/*
  Warnings:

  - Changed the type of `number` on the `rents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `rents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rents" DROP COLUMN "number",
ADD COLUMN     "number" DOUBLE PRECISION NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
