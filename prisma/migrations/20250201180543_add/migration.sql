/*
  Warnings:

  - Added the required column `address` to the `rents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `rents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `rents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `rents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `rents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `rents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rents" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
