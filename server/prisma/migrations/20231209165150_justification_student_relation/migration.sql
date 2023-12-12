/*
  Warnings:

  - Added the required column `studentRun` to the `Justification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Justification" ADD COLUMN     "studentRun" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Justification" ADD CONSTRAINT "Justification_studentRun_fkey" FOREIGN KEY ("studentRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;
