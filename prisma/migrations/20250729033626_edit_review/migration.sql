/*
  Warnings:

  - You are about to drop the column `comment` on the `review` table. All the data in the column will be lost.
  - Added the required column `isRead` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `comment`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isRead` BOOLEAN NOT NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
