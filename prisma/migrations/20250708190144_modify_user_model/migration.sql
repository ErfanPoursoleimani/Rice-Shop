/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `phoneNumber` INTEGER NOT NULL DEFAULT 0,
    ALTER COLUMN `postalCode` DROP DEFAULT,
    ALTER COLUMN `address` DROP DEFAULT,
    ALTER COLUMN `firstName` DROP DEFAULT,
    ALTER COLUMN `lastName` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
