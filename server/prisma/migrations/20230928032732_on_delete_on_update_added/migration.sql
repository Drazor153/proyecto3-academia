-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_classGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `LevelsOnStudents` DROP FOREIGN KEY `LevelsOnStudents_studentId_fkey`;

-- AlterTable
ALTER TABLE `Student` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `LevelsOnStudents` ADD CONSTRAINT `LevelsOnStudents_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`run`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `ClassGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
