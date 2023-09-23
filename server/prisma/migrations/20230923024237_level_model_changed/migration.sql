/*
  Warnings:

  - The primary key for the `Level` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level_number` on the `Level` table. All the data in the column will be lost.
  - The primary key for the `LevelsOnStudents` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `LevelsOnStudents` DROP FOREIGN KEY `LevelsOnStudents_levelId_fkey`;

-- AlterTable
ALTER TABLE `Level` DROP PRIMARY KEY,
    DROP COLUMN `level_number`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `LevelsOnStudents` DROP PRIMARY KEY,
    MODIFY `levelId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`studentId`, `levelId`);

-- AlterTable
ALTER TABLE `Student` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `LevelsOnStudents` ADD CONSTRAINT `LevelsOnStudents_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
