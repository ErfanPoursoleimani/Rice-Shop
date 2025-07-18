/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `phoneNumber` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    ADD COLUMN `priceAr` INTEGER NOT NULL DEFAULT 1200,
    ADD COLUMN `priceDe` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `priceEn` INTEGER NOT NULL DEFAULT 12,
    ADD COLUMN `priceFa` INTEGER NOT NULL DEFAULT 12000;

-- AlterTable
ALTER TABLE `user` MODIFY `phoneNumber` INTEGER NOT NULL;
