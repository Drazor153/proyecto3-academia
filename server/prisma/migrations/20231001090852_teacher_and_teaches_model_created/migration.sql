-- CreateTable
CREATE TABLE `Teacher` (
    `run` INTEGER NOT NULL,
    `dv` CHAR(1) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_surname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`run`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teaches` (
    `teacherRun` INTEGER NOT NULL,
    `levelCode` CHAR(2) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teaches` ADD CONSTRAINT `teaches_teacherRun_fkey` FOREIGN KEY (`teacherRun`) REFERENCES `Teacher`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teaches` ADD CONSTRAINT `teaches_levelCode_fkey` FOREIGN KEY (`levelCode`) REFERENCES `Level`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
