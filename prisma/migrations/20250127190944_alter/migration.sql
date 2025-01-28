/*
  Warnings:

  - You are about to drop the column `price_per_day` on the `machines` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_km` on the `machines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "machines" DROP COLUMN "price_per_day",
DROP COLUMN "price_per_km";
