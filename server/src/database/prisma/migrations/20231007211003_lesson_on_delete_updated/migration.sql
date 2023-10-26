-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_teacherRun_fkey`;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `Teacher`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;
