/*
  Warnings:

  - You are about to drop the column `teacherRun` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacherRun_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "teacherRun";

-- CreateTable
CREATE TABLE "lesson_teacher" (
    "lessonId" INTEGER NOT NULL,
    "teacherRun" INTEGER NOT NULL,

    CONSTRAINT "lesson_teacher_pkey" PRIMARY KEY ("lessonId","teacherRun")
);

-- AddForeignKey
ALTER TABLE "lesson_teacher" ADD CONSTRAINT "lesson_teacher_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_teacher" ADD CONSTRAINT "lesson_teacher_teacherRun_fkey" FOREIGN KEY ("teacherRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;
