/*
  Warnings:

  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_classId_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_studentRun_fkey";

-- DropTable
DROP TABLE "attendance";

-- CreateTable
CREATE TABLE "Attendance" (
    "classId" INTEGER NOT NULL,
    "studentRun" INTEGER NOT NULL,
    "justificationId" INTEGER,
    "attended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("classId","studentRun")
);

-- CreateTable
CREATE TABLE "Justification" (
    "id" SERIAL NOT NULL,
    "init_ausencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_ausencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num_inasistente" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Justification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentRun_fkey" FOREIGN KEY ("studentRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_justificationId_fkey" FOREIGN KEY ("justificationId") REFERENCES "Justification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
