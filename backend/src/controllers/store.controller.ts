import {NextFunction, Request, Response} from "express";
import { z } from "zod";
import * as RecipeDTOs from "../type/recipe.dto"
import StoreService from "../services/store.service.ts";
import BaseController from "./base.controller.ts";
import { UserDTO } from "@/type/auth.dto.ts";

class StoreController extends BaseController {

  private storeService: StoreService;
  constructor(service: StoreService) {
    super()
    this.storeService = service;
  }

  public all = async (req: Request, res: Response,next: NextFunction) =>{
    
    try{
      this.success(res);
    }catch(e: unknown){
      next(e);
    }
    
  }

  public create = async (req: Request, res: Response,next: NextFunction) => {
    const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1])
    try{
        // const createdData = await this.recipeService.create(inputData)
        // this.success(res,createdData);
    }catch(e: unknown){
        next(e)
    }
  }

  
}

export default StoreController;