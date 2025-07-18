/*
  Warnings:

  - You are about to drop the column `quantity` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `quantity`,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 10;
