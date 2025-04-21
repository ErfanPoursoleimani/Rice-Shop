/*
  Warnings:

  - You are about to drop the column `cont` on the `addedtocartproduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addedtocartproduct` DROP COLUMN `cont`,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 1;
