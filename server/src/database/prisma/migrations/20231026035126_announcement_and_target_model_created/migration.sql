-- CreateTable
CREATE TABLE `Announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SendTo` (
    `announcementId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,

    PRIMARY KEY (`announcementId`, `targetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Target` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SendTo` ADD CONSTRAINT `SendTo_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SendTo` ADD CONSTRAINT `SendTo_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Target`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
