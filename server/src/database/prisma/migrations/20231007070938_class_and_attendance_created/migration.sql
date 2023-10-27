/*
  Warnings:

  - You are about to drop the `teaches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teaches` DROP FOREIGN KEY `teaches_levelCode_fkey`;

-- DropForeignKey
ALTER TABLE `teaches` DROP FOREIGN KEY `teaches_teacherRun_fkey`;

-- DropTable
DROP TABLE `teaches`;

-- CreateTable
CREATE TABLE `Lesson` (
    `teacherRun` INTEGER NOT NULL,
    `levelCode` CHAR(2) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `lesson` CHAR(1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `week` INTEGER NOT NULL,
    `contents` VARCHAR(191) NOT NULL,
    `lessonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `classId` INTEGER NOT NULL,
    `studentRun` INTEGER NOT NULL,

    PRIMARY KEY (`classId`, `studentRun`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `Teacher`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_levelCode_fkey` FOREIGN KEY (`levelCode`) REFERENCES `Level`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;
