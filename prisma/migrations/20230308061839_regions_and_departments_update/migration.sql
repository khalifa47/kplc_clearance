/*
  Warnings:

  - Made the column `email` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `region_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_region_id_fkey`;

-- AlterTable
ALTER TABLE `clearances` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `departments` MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `department_id` INTEGER NOT NULL,
    MODIFY `region_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
