/*
  Warnings:

  - A unique constraint covering the columns `[postalCode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order` ALTER COLUMN `postalCode` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Order_postalCode_key` ON `Order`(`postalCode`);
