import {Router} from "express";
import { PrismaClient } from "@prisma/client";

abstract class Route {
    protected router = Router();
    protected abstract setRoutes(client: PrismaClient): void;

    public getRouter() {
        return this.router;
    }
}

export default Route;