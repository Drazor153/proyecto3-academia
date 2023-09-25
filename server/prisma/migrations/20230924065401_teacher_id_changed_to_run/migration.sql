/*
  Warnings:

  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `run` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ClassGroup` DROP FOREIGN KEY `ClassGroup_teacherId_fkey`;

-- AlterTable
ALTER TABLE `Student` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Teacher` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `run` INTEGER NOT NULL,
    ADD PRIMARY KEY (`run`);

-- AddForeignKey
ALTER TABLE `ClassGroup` ADD CONSTRAINT `ClassGroup_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;
