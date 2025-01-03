
export type RecipeDTO = {
    id?: Number,
    name: String,  
    description: String,
    servings: Number,  
    video_link?: String,  
    tags?: RecipeTagDTO[],  
    steps?: RecipeStepDTO[],
    materials?: RecipeMaterialDTO[],
    user_id: Number,
    created_at?: Date, 
    updated_at?: Date
};

export type RecipeMaterialDTO = {
    id?: Number,
    name: String,  
    number: Number,
    unit: String,
};

export type RecipeTagDTO = {
    id?: Number,
    category: Number, 
};

export type RecipeStepDTO = {
    id?: Number,
    image?: String, 
    step:Number,
    description:String,
};

export type RecipeConditionsDTO = {
    tags?: number[],
    materials: string[] ,
}
