/*
  Warnings:

  - Added the required column `grade` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Students` ADD COLUMN `grade` INTEGER NOT NULL;
