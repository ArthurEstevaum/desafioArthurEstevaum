/*
  Warnings:

  - You are about to drop the column `loayaltyWeekdayPrice` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `loayaltyWeekendPrice` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Car` table. All the data in the column will be lost.
  - You are about to alter the column `category` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.
  - Added the required column `loyaltyWeekdayPrice` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loyaltyWeekendPrice` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `loayaltyWeekdayPrice`,
    DROP COLUMN `loayaltyWeekendPrice`,
    DROP COLUMN `manufacturer`,
    ADD COLUMN `loyaltyWeekdayPrice` DOUBLE NOT NULL,
    ADD COLUMN `loyaltyWeekendPrice` DOUBLE NOT NULL,
    MODIFY `category` ENUM('CompactHatch', 'MediumHatch', 'Sedan', 'Van', 'Pickup') NOT NULL;
