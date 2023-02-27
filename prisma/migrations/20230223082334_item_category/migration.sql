/*
  Warnings:

  - You are about to drop the column `department_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `item_category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_department_id_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `department_id`,
    ADD COLUMN `item_category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `item_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item_categories` ADD CONSTRAINT `item_categories_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_item_category_id_fkey` FOREIGN KEY (`item_category_id`) REFERENCES `item_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
