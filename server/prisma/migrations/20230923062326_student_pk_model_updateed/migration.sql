/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `ClassGroup` DROP FOREIGN KEY `ClassGroup_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `LevelsOnStudents` DROP FOREIGN KEY `LevelsOnStudents_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Results` DROP FOREIGN KEY `Results_studentId_fkey`;

-- DropIndex
DROP INDEX `Student_run_key` ON `Student`;

-- AlterTable
ALTER TABLE `ClassGroup` MODIFY `groupId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`letter`);

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ALTER COLUMN `updatedAt` DROP DEFAULT,
    ADD PRIMARY KEY (`run`);

-- AddForeignKey
ALTER TABLE `LevelsOnStudents` ADD CONSTRAINT `LevelsOnStudents_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassGroup` ADD CONSTRAINT `ClassGroup_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`letter`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;
