/*
  Warnings:

  - Added the required column `name` to the `Recipe_material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe_material" ADD COLUMN     "name" TEXT NOT NULL;
