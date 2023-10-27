/*
  Warnings:

  - You are about to drop the column `category` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Announcement` DROP COLUMN `category`,
    ADD COLUMN `categoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
