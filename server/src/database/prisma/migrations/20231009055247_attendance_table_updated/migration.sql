-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `attendance_classId_fkey`;

-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `attended` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
