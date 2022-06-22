/*
  Warnings:

  - Made the column `grade` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `students` MODIFY `grade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
