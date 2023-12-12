/*
  Warnings:

  - Made the column `approved` on table `Justification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Justification" ALTER COLUMN "approved" SET NOT NULL,
ALTER COLUMN "approved" SET DATA TYPE TEXT;
