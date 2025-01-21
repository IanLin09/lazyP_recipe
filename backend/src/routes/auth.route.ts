import Route from "./route.ts";
import { PrismaClient } from "@prisma/client";
import AuthController from "../controllers/auth.controller.ts"
import AuthService from "../services/auth.service.ts";
import AuthRepository from "../repositories/auth.repository.ts";
import { authorization } from "../middlewares/authorization.middleware.ts"
 
class AuthRoute extends Route{
    
    constructor(client: PrismaClient) {
        super();
        this.setRoutes(client);
    }

    protected setRoutes(client: PrismaClient) {
        let repo: AuthRepository = new AuthRepository(client);
        let service: AuthService = new AuthService(repo)
        let controller: AuthController = new AuthController(service)
    
        
        this.router.post('/login',controller.login);
        this.router.post('/email-authorization',controller.emailAuthorization);
        this.router.post('/register',controller.create);
        this.router.post('/forgot',controller.forgot);
        this.router.put('/account', authorization,controller.updateUserInfo);
        this.router.patch('/password',authorization,controller.updatePassword);
        this.router.get('/account',authorization,controller.userInfo);
    }

}

export default AuthRoute;