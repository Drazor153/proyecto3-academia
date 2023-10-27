-- AlterTable
ALTER TABLE `Announcement` ADD COLUMN `run` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_run_fkey` FOREIGN KEY (`run`) REFERENCES `User`(`run`) ON DELETE SET NULL ON UPDATE CASCADE;
