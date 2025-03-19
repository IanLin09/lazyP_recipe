import Route from "./route.js";
import { PrismaClient } from "@prisma/client";
import { authorization } from "../middlewares/authorization.middleware.js"
import RecipeController from "../controllers/recipe.controller.js"
import RecipeService from "../services/recipe.service.js";
import RecipeRepository from "../repositories/recipe.repository.js";
import upload from "../helper/image.js";
 
class RecipeRoute extends Route{
    
    constructor(client: PrismaClient) {
        super();
        this.setRoutes(client);
    }

    protected setRoutes(client: PrismaClient) {
        let repo: RecipeRepository = new RecipeRepository(client);
        let service: RecipeService = new RecipeService(repo);
        let controller: RecipeController = new RecipeController(service);
        
        
        this.router.get('/recipe', controller.all);
        this.router.get('/my_recipe', controller.myRecipe);
        this.router.get('/recipe/:id',controller.find);
        this.router.get('/recipe_edit/:id',controller.edit);
        //dynamic file name so use any()
        this.router.post('/recipe',[authorization,upload.any()],controller.create);
        this.router.post('/recipe_step',[authorization,upload.array('image[]')],controller.createRecipeSteps);
        this.router.put('/recipe/delete/:id',authorization,controller.delete);
        this.router.put('/recipe/:id',[authorization,upload.any()],controller.update);
    }

}

export default RecipeRoute;