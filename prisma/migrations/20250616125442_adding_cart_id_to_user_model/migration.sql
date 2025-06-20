/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `cartId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cartId_key` ON `User`(`cartId`);
