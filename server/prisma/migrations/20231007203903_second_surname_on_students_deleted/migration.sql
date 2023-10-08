/*
  Warnings:

  - You are about to drop the column `second_surname` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `second_surname`;

-- AlterTable
ALTER TABLE `gives` MODIFY `grade` DOUBLE NOT NULL;
