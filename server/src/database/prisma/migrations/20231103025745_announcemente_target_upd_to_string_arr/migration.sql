/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the `SendTo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SendTo" DROP CONSTRAINT "SendTo_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "SendTo" DROP CONSTRAINT "SendTo_targetId_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "send_to" TEXT[];

-- DropTable
DROP TABLE "SendTo";
