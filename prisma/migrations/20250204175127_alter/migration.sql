/*
  Warnings:

  - Made the column `status` on table `rents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rents" ALTER COLUMN "status" SET NOT NULL;
