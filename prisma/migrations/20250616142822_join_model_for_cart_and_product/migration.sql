/*
  Warnings:

  - You are about to drop the column `count` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `_carttoproduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `count`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `orderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_carttoproduct`;

-- CreateTable
CREATE TABLE `CartProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `CartProduct_cartId_key`(`cartId`),
    UNIQUE INDEX `CartProduct_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_orderId_key` ON `User`(`orderId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
