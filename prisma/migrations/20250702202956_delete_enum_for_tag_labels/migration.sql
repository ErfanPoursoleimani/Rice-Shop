/*
  Warnings:

  - You are about to alter the column `label` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - A unique constraint covering the columns `[label]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tag` MODIFY `label` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_label_key` ON `Tag`(`label`);
