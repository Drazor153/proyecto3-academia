/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_teacherRun_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `attendance_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `enrols` DROP FOREIGN KEY `enrols_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `gives` DROP FOREIGN KEY `gives_studentRun_fkey`;

-- DropTable
DROP TABLE `Student`;

-- DropTable
DROP TABLE `Teacher`;

-- CreateTable
CREATE TABLE `User` (
    `run` INTEGER NOT NULL,
    `dv` CHAR(1) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_surname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `date_join` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_join` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`run`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gives` ADD CONSTRAINT `gives_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `User`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;
