/*
  Warnings:

  - Made the column `tagId` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_tagId_fkey`;

-- DropIndex
DROP INDEX `Product_tagId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `tagId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
