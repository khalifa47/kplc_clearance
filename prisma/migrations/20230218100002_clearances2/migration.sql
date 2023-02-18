-- AddForeignKey
ALTER TABLE `department_clearances` ADD CONSTRAINT `department_clearances_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
