-- CreateTable
CREATE TABLE `Student` (
    `run` INTEGER NOT NULL,
    `dv` CHAR(1) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_surname` VARCHAR(191) NOT NULL,
    `second_surname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`run`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Level` (
    `code` CHAR(2) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrols` (
    `levelCode` CHAR(2) NOT NULL,
    `studentRun` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,

    PRIMARY KEY (`levelCode`, `studentRun`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `topicId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gives` (
    `quizId` INTEGER NOT NULL,
    `studentRun` INTEGER NOT NULL,
    `grade` FLOAT NOT NULL,

    PRIMARY KEY (`quizId`, `studentRun`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_levelCode_fkey` FOREIGN KEY (`levelCode`) REFERENCES `Level`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrols` ADD CONSTRAINT `enrols_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gives` ADD CONSTRAINT `gives_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gives` ADD CONSTRAINT `gives_studentRun_fkey` FOREIGN KEY (`studentRun`) REFERENCES `Student`(`run`) ON DELETE RESTRICT ON UPDATE CASCADE;
