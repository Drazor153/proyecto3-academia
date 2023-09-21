/*
  Warnings:

  - You are about to drop the column `nombre` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `primerApellido` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `segundoApellido` on the `Student` table. All the data in the column will be lost.
  - Added the required column `firstLastname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondLastname` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `nombre`,
    DROP COLUMN `primerApellido`,
    DROP COLUMN `segundoApellido`,
    ADD COLUMN `firstLastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondLastname` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Exam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Results` (
    `examId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `grade` INTEGER NOT NULL,

    PRIMARY KEY (`examId`, `studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
