/*
  Warnings:

  - You are about to drop the column `semester` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Quiz` table. All the data in the column will be lost.
  - The primary key for the `enrols` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semester` on the `enrols` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `enrols` table. All the data in the column will be lost.
  - Added the required column `periodId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avg` to the `enrols` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodId` to the `enrols` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "semester",
DROP COLUMN "year",
ADD COLUMN     "periodId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "semester",
DROP COLUMN "year",
ADD COLUMN     "periodId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "enrols" DROP CONSTRAINT "enrols_pkey",
DROP COLUMN "semester",
DROP COLUMN "year",
ADD COLUMN     "avg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "opt" DOUBLE PRECISION,
ADD COLUMN     "periodId" INTEGER NOT NULL,
ADD CONSTRAINT "enrols_pkey" PRIMARY KEY ("studentRun", "periodId");

-- CreateTable
CREATE TABLE "Period" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "enrols" ADD CONSTRAINT "enrols_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
