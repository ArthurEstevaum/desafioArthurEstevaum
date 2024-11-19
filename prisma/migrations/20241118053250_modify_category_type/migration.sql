/*
  Warnings:

  - You are about to alter the column `category` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `Car` MODIFY `category` INTEGER NOT NULL;
