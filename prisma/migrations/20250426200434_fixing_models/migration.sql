/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_orderId_fkey`;

-- AlterTable
ALTER TABLE `addedtocartproduct` ADD COLUMN `orderId` INTEGER NULL;

-- DropTable
DROP TABLE `product`;

-- AddForeignKey
ALTER TABLE `addedToCartProduct` ADD CONSTRAINT `addedToCartProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
