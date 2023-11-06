-- CreateTable
CREATE TABLE "User" (
    "run" INTEGER NOT NULL,
    "dv" CHAR(1) NOT NULL,
    "name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date_join" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_join" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "refresh_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("run")
);

-- CreateTable
CREATE TABLE "Level" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "enrols" (
    "levelCode" CHAR(2) NOT NULL,
    "studentRun" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "enrols_pkey" PRIMARY KEY ("levelCode","studentRun","year","semester")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "levelCode" CHAR(2) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gives" (
    "quizId" INTEGER NOT NULL,
    "studentRun" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "gives_pkey" PRIMARY KEY ("quizId","studentRun")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "teacherRun" INTEGER,
    "levelCode" CHAR(2) NOT NULL,
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "lesson" CHAR(1) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "contents" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "classId" INTEGER NOT NULL,
    "studentRun" INTEGER NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("classId","studentRun")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "run" INTEGER,
    "title" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "image" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendTo" (
    "announcementId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "SendTo_pkey" PRIMARY KEY ("announcementId","targetId")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "enrols" ADD CONSTRAINT "enrols_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrols" ADD CONSTRAINT "enrols_studentRun_fkey" FOREIGN KEY ("studentRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gives" ADD CONSTRAINT "gives_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gives" ADD CONSTRAINT "gives_studentRun_fkey" FOREIGN KEY ("studentRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacherRun_fkey" FOREIGN KEY ("teacherRun") REFERENCES "User"("run") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_studentRun_fkey" FOREIGN KEY ("studentRun") REFERENCES "User"("run") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_run_fkey" FOREIGN KEY ("run") REFERENCES "User"("run") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendTo" ADD CONSTRAINT "SendTo_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendTo" ADD CONSTRAINT "SendTo_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;
