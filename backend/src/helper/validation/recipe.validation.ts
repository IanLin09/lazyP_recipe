import { z } from "zod"

enum RecipeCategoy {
    "meat" = 1,
    "vegetable" = 2,
    "dessert" = 3
}

export const recipeMaterialValidation = z.object({
    name:z.string({
            required_error: "name is required",
            invalid_type_error: "name must be a string",
    }),
    number: z.number({
        required_error: "number is required",
        invalid_type_error: "number must be a number",
    }).positive(),
    unit: z.string({
        required_error: "unit is required",
        invalid_type_error: "unit must be a string",
    }),
})

export const recipeTagValidation = z.object({
    category: z.nativeEnum(RecipeCategoy),
})

export const recipeStepValidation = z.object({
    step: z.any({
        required_error: "step is required",
        invalid_type_error: "step must be a number",
    }),
    images:z.any().optional(),
    description: z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ),
})

export const recipeValidation = z.object({
    name:z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ),
    description: z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ),
    servings: z.number(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ).positive(),
    material:z.array(recipeMaterialValidation).min(1,"At least one material is required"),
    video_link: z.string().optional(),
    tags:z.array(recipeTagValidation).min(1,"At least one tag is required"),
    steps:z.array(recipeStepValidation).min(1,"At least one step is required"),
});

export const updateRecipeValidation = z.object({
    name:z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ),
    description: z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ),
    servings: z.number(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ).positive(),
    video_link: z.string().optional()
})

export const recipeQuerySchema = z.object({
    tags: z.string().optional(),
    keyword: z.string().optional()
    //keyword: z.string().optional().transform((materials) => materials ? materials.split(",") : undefined),
    //tags: z.string().optional().transform((tags) => tags ? tags.split(",").map(Number) : undefined),
  });