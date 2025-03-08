import { RecipeDTO, RecipeTagDTO } from "@/utils/dto";

export const parseRecipe = (data: any): RecipeDTO => {

    const tag: RecipeTagDTO = data.tags?.[0] 
    ? { ...data.tags[0] } 
    : { id: 0, category: 1 };
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        servings: data.servings,
        video_link: data.video_link,
        tags: tag,
        materials: data.materials?.map((material:any) => ({
            ...material
        })),
        steps: data.steps?.map((step:any) => ({
            ...step
        })),
        user_id: data.user_id,
        created_at: data.created_at ? new Date(data.created_at) : undefined,
        updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
    };
};


