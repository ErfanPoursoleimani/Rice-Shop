/*
  Warnings:

  - Added the required column `unit` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `unit` VARCHAR(191) NOT NULL;
