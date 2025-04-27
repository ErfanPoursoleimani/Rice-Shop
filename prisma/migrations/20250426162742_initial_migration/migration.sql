-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `Product_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addedToCartProduct` (
    `id` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `addedToCartProduct_id_key`(`id`),
    UNIQUE INDEX `addedToCartProduct_label_key`(`label`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL DEFAULT 'firstName',
    `lastName` VARCHAR(191) NOT NULL DEFAULT 'lastName',
    `phoneNumber` INTEGER NOT NULL DEFAULT 0,
    `postalCode` INTEGER NOT NULL DEFAULT 0,
    `address` VARCHAR(191) NOT NULL DEFAULT 'address',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
