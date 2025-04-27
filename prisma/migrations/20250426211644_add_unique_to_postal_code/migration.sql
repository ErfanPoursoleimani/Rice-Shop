/*
  Warnings:

  - A unique constraint covering the columns `[postalCode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Order_postalCode_key` ON `Order`(`postalCode`);
