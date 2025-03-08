import {RecipeDTO,RecipeConditionsDTO, CreateRecipeDTO} from "../type/recipe.dto.js"
import RecipeRepository from '../repositories/recipe.repository.js';
import { ThrowError } from "../helper/error.js";


class RecipeService{

    private RecipeRepository : RecipeRepository;

    constructor(repo:RecipeRepository){
        this.RecipeRepository = repo;
    }

    public all = async(conditions: RecipeConditionsDTO):Promise<RecipeDTO> => {
        const data = await this.RecipeRepository.all(conditions)
        return data
    }

    public create = async(data: CreateRecipeDTO) => {
       
        const createdData = await this.RecipeRepository.create(data)
        return createdData;
    }

    public findUnique = async(id: number) => {
        const recipe = await this.RecipeRepository.findById(id);
        
        return recipe;
    }

    public updateRecipe = async(id: number,data:RecipeDTO) => {
        const recipe = await this.RecipeRepository.update(id,data);
        
        return recipe;
    }

    public softDelete = async(id:number,userId:number) => {
        const recipe = await this.RecipeRepository.findById(id);

        if (userId != recipe.user_id){
            throw new ThrowError(401,'Unauthorized')
        }

        if (recipe.deleted_at){
            await this.RecipeRepository.republic(id);
        }else{
            await this.RecipeRepository.softDelete(id);
        }
        
    }
}

export default RecipeService;