import {RecipeDTO,RecipeConditionsDTO} from "../type/recipe.dto"
import RecipeRepository from '../repositories/recipe.repository';


class RecipeService{

    private RecipeRepository : RecipeRepository;

    constructor(repo:RecipeRepository){
        this.RecipeRepository = repo;
    }

    public all = async(conditions: RecipeConditionsDTO):Promise<RecipeDTO> => {
        const data = await this.RecipeRepository.all(conditions)
        return data
    }

    public create = async(data: RecipeDTO) => {
       
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

    public softDelete = async(id:number) => {
        await this.RecipeRepository.softDelete(id);
    }
}

export default RecipeService;