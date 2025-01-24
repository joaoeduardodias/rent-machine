/*
  Warnings:

  - Added the required column `quantity` to the `machines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "machines" ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "price_per_day" DROP NOT NULL,
ALTER COLUMN "price_per_km" DROP NOT NULL;
