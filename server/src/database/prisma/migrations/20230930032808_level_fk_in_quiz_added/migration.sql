/*
  Warnings:

  - Added the required column `levelCode` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `levelCode` CHAR(2) NOT NULL;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_levelCode_fkey` FOREIGN KEY (`levelCode`) REFERENCES `Level`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
