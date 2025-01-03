import Route from "./routes/route.ts";
import AuthRoute from "./routes/auth.route.ts";
import { PrismaClient } from "@prisma/client";
import RecipeRoute from "./routes/recipe.route.ts";

class Router {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
       this.client = client;
    }

    public AllRoutes(): Array<Route>{
        return [
            new AuthRoute(this.client),
            new RecipeRoute(this.client)
        ];
    }
}

export default Router;