/*
  Warnings:

  - The primary key for the `enrols` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `enrols` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`levelCode`, `studentRun`, `year`, `semester`);
