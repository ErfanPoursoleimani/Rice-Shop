/*
  Warnings:

  - You are about to drop the column `priceDe` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `priceEn` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `priceAr` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `priceFa` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `priceDe`,
    DROP COLUMN `priceEn`,
    ADD COLUMN `originalPriceAr` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `originalPriceFa` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `priceAr` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `priceFa` DOUBLE NOT NULL DEFAULT 0;
