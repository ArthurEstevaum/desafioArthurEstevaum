/*
  Warnings:

  - Added the required column `manufacturer` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `manufacturer` VARCHAR(191) NOT NULL;
