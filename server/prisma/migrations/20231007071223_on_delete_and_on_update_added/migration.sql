-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_teacherRun_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `attendance_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `enrols` DROP FOREIGN KEY `enrols_levelCode_fkey`;

-- DropForeignKey
ALTER TABLE `enrols` DROP FOREIGN KEY `enrols_studentRun_fkey`;

-- DropForeignKey
ALTER TABLE `gives` DROP FOREIGN KEY `gives_studentRun_fkey`;

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_levelCode_fkey` FOREIGN KEY (`levelCode`) REFERENCES `Level`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gives` ADD CONSTRAINT `gives_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `Teacher`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;
