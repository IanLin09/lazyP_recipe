import Route from "./route.ts";
import { PrismaClient } from "@prisma/client";
import { authorization } from "../middlewares/authorization.middleware.ts"
import RecipeController from "../controllers/recipe.controller.ts"
import RecipeService from "../services/recipe.service.ts";
import RecipeRepository from "../repositories/recipe.repository.ts";
import upload from "../helper/image.ts";
 
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
        this.router.get('/recipe/:id',controller.find);
        this.router.post('/recipe',[authorization,upload.array('file')],controller.create);
        this.router.post('/recipe_step',[authorization,upload.array('image[]')],controller.createRecipeSteps);
        this.router.put('/recipe/delete/:id',authorization,controller.delete);
        this.router.put('/recipe/:id',authorization,controller.update);
    }

}

export default RecipeRoute;