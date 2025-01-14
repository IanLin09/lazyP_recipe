export type RecipeDTO = {
    id?: number,
    name: string,  
    description: string,
    servings: number,  
    video_link?: string,  
    tags?: RecipeTagDTO,  
    steps?: RecipeStepDTO[],
    materials?: RecipeMaterialDTO[],
    user_id: number,
    created_at?: Date, 
    updated_at?: Date
};

export type RecipeMaterialDTO = {
    id?: number,
    name: string,  
    number: number,
    unit: string,
};

export type RecipeTagDTO = {
    id?: number,
    category: number, 
};

export type RecipeStepDTO = {
    id?: number,
    image?: string,
    image_file?: any,
    step:number,
    description:string,
};

export type RouteHandle = {
    heading: string;
    subheading: string;
}

export const CreateEmptyRecipe = ():RecipeDTO => {
    const tags: RecipeTagDTO = {category:0}

    const step: RecipeStepDTO[] = [
        {step:0,description:""}
    ]

    const material: RecipeMaterialDTO[] = [
        {name:'',number:0,unit:''}
    ]

    return {
        name: '',  
        description: '',
        servings: 1,  
        video_link: '',
        user_id: 1,
        tags: tags,
        steps:step,
        materials:material
    }
}