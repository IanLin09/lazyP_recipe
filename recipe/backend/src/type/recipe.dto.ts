
export type RecipeDTO = {
    id: number,
    name: string,  
    description: string,
    servings: number,  
    video_link?: string,  
    tags?: RecipeTagDTO,  
    steps?: RecipeStepDTO[],
    materials?: RecipeMaterialDTO[],
    user_id: number,
    created_at?: Date, 
    updated_at?: Date,
    deleted_at?: Date
};

export type RecipeMaterialDTO = {
    id: number,
    name: string,  
    number: number,
    unit: string,
};

export type RecipeTagDTO = {
    id: number,
    category: number, 
};

export type RecipeStepDTO = {
    id: number,
    image?: string, 
    step:number,
    description:string,
};

export type RecipeConditionsDTO = {
    tags?: number,
    keyword?: string,
    id?:number
}

export type CreateRecipeDTO = {
    name: string,  
    description: string,
    servings: number,  
    video_link?: string,  
    tags?: CreateRecipeTagDTO,  
    steps?: CreateRecipeStepDTO[],
    materials?:CreateRecipeMaterialDTO[],
    user_id: number,
    created_at?: Date, 
    updated_at?: Date
};

export type CreateRecipeMaterialDTO = {
    name: string,  
    number: number,
    unit: string,
};

export type CreateRecipeTagDTO = {
    category: number, 
};

export type CreateRecipeStepDTO = {
    image?: string, 
    step:number,
    description:string,
};


