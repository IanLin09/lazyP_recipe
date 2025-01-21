import { z } from "zod"

enum RecipeCategory {
    "meat" = 1,
    "vegetable" = 2,
    "main dish" = 3
}

export const recipeMaterialValidation = z.object({
    id:z.coerce.number().optional(),
    name:z.string({
            required_error: "name is required",
            invalid_type_error: "name must be a string",
    }).min(1),
    number: z.coerce.number({
        required_error: "number is required",
        invalid_type_error: "number must be a number",
    }).positive(),
    unit: z.string({
        required_error: "unit is required",
        invalid_type_error: "unit must be a string",
    }),
})

export const recipeTagValidation = z.object({
    id:z.coerce.number().optional(),
    category: z.coerce.number(),
})

export const recipeStepValidation = z.object({
    id:z.coerce.number().optional(),
    step: z.coerce.number({
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
    id:z.coerce.number().optional(),
    name:z.string(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ).min(1,"can't be empty"),
    description: z.string(
        {
            required_error: "description is required",
            invalid_type_error: "description must be a string",
        }
    ),
    servings: z.coerce.number(
        {
            required_error: "servings is required",
            invalid_type_error: "servings must be a number",
        }
    ).positive(),
    materials:z.array(recipeMaterialValidation).min(1,"At least one material is required"),
    video_link: z.string().optional(),
    tags:recipeTagValidation,
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
    servings: z.coerce.number(
        {
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        }
    ).positive(),
    video_link: z.string().optional()
})

export const recipeQuerySchema = z.object({
    tags: z.string().optional(),
    keyword: z.string().optional(),
    person:z.coerce.number().optional(),
    //keyword: z.string().optional().transform((materials) => materials ? materials.split(",") : undefined),
    //tags: z.string().optional().transform((tags) => tags ? tags.split(",").map(Number) : undefined),
  });