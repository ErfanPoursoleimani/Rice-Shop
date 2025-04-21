/*
  Warnings:

  - You are about to drop the column `pricePerKilo` on the `addedtocartproduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `addedToCartProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `addedToCartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `addedToCartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addedtocartproduct` DROP COLUMN `pricePerKilo`,
    ADD COLUMN `cont` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `addedToCartProduct_id_key` ON `addedToCartProduct`(`id`);
