/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[orderId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `orderId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `cartId` INTEGER NOT NULL,
    MODIFY `status` ENUM('IN_PROGRESS', 'SENT', 'CANCELLED') NOT NULL DEFAULT 'IN_PROGRESS';

-- CreateIndex
CREATE UNIQUE INDEX `Cart_orderId_key` ON `Cart`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Order_cartId_key` ON `Order`(`cartId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
