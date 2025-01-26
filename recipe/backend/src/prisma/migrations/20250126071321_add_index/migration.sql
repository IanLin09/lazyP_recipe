-- CreateIndex
CREATE INDEX "Recipe_name_idx" ON "Recipe"("name");

-- CreateIndex
CREATE INDEX "Recipe_material_recipe_id_name_idx" ON "Recipe_material"("recipe_id", "name");

-- CreateIndex
CREATE INDEX "Recipe_steps_recipe_id_idx" ON "Recipe_steps"("recipe_id");

-- CreateIndex
CREATE INDEX "Recipe_tags_recipe_id_category_idx" ON "Recipe_tags"("recipe_id", "category");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
