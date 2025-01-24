/*
  Warnings:

  - You are about to drop the column `material` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "material";

-- CreateTable
CREATE TABLE "Recipe_material" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_material_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe_material" ADD CONSTRAINT "Recipe_material_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
