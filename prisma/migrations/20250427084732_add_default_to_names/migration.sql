-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'firstName',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'lastName';
