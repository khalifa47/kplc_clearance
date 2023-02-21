-- DropForeignKey
ALTER TABLE `clearances` DROP FOREIGN KEY `clearances_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `clearances` DROP FOREIGN KEY `clearances_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `department_clearances` DROP FOREIGN KEY `department_clearances_clearance_id_fkey`;

-- DropForeignKey
ALTER TABLE `department_clearances` DROP FOREIGN KEY `department_clearances_cleared_by_fkey`;

-- DropForeignKey
ALTER TABLE `department_clearances` DROP FOREIGN KEY `department_clearances_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `department_clearances` DROP FOREIGN KEY `department_clearances_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_status_id_fkey`;

-- CreateTable
CREATE TABLE `items` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assigned_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `assignedOn` DATETIME(3) NOT NULL,
    `returnedOn` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `statuses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clearances` ADD CONSTRAINT `clearances_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clearances` ADD CONSTRAINT `clearances_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `statuses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department_clearances` ADD CONSTRAINT `department_clearances_clearance_id_fkey` FOREIGN KEY (`clearance_id`) REFERENCES `clearances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department_clearances` ADD CONSTRAINT `department_clearances_cleared_by_fkey` FOREIGN KEY (`cleared_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department_clearances` ADD CONSTRAINT `department_clearances_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `statuses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department_clearances` ADD CONSTRAINT `department_clearances_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assigned_items` ADD CONSTRAINT `assigned_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assigned_items` ADD CONSTRAINT `assigned_items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
