import Route from "./route.ts";
import { PrismaClient } from "@prisma/client";
import { authorization } from "../middlewares/authorization.middleware.ts"
import RecipeController from "../controllers/recipe.controller.ts"
import RecipeService from "../services/recipe.service.ts";
import RecipeRepository from "../repositories/recipe.repository.ts";
 
class RecipeRoute extends Route{
    
    constructor(client: PrismaClient) {
        super();
        this.setRoutes(client);
    }

    protected setRoutes(client: PrismaClient) {
        let repo: RecipeRepository = new RecipeRepository(client);
        let service: RecipeService = new RecipeService(repo);
        let controller: RecipeController = new RecipeController(service);
        
        this.router.use(authorization);
        this.router.get('/recipe', authorization,controller.all);
        this.router.post('/recipe',controller.create);
        this.router.get('/recipe/:id',controller.find);
        this.router.put('/recipe/delete/:id',controller.delete);
        this.router.put('/recipe/:id',controller.update);
    }

}

export default RecipeRoute;