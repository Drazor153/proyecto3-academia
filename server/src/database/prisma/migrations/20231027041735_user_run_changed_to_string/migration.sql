/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `enrols` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gives` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_run_fkey`;

-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_teacherRun_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `attendance_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `enrols` DROP FOREIGN KEY `enrols_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `gives` DROP FOREIGN KEY `gives_studentRun_fkey`;

-- AlterTable
ALTER TABLE `Announcement` MODIFY `run` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Lesson` MODIFY `teacherRun` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `run` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`run`);

-- AlterTable
ALTER TABLE `attendance` DROP PRIMARY KEY,
    MODIFY `studentRun` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`classId`, `studentRun`);

-- AlterTable
ALTER TABLE `enrols` DROP PRIMARY KEY,
    MODIFY `studentRun` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`levelCode`, `studentRun`, `year`, `semester`);

-- AlterTable
ALTER TABLE `gives` DROP PRIMARY KEY,
    MODIFY `studentRun` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`quizId`, `studentRun`);

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gives` ADD CONSTRAINT `gives_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `User`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `User`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_run_fkey` FOREIGN KEY (`run`) REFERENCES `User`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;
