/*
  Warnings:

  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Estudiante`;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `run` INTEGER NOT NULL,
    `dv` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `primerApellido` VARCHAR(191) NOT NULL,
    `segundoApellido` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_run_key`(`run`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
