/*
  Warnings:

  - You are about to alter the column `grade` on the `Results` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Results` MODIFY `grade` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Student` ALTER COLUMN `updatedAt` DROP DEFAULT;
