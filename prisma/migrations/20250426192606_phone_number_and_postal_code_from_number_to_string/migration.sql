-- AlterTable
ALTER TABLE `user` MODIFY `phoneNumber` VARCHAR(191) NOT NULL,
    MODIFY `postalCode` VARCHAR(191) NOT NULL DEFAULT '';
