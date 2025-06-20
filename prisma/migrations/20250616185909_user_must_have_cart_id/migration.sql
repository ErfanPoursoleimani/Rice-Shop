/*
  Warnings:

  - Made the column `cartId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `cartId` INTEGER NOT NULL;
