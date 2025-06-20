/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_userId_key` ON `Order`(`userId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
