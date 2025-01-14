import {NextFunction, Request, Response} from "express";
import { z } from "zod";
import * as RecipeDTOs from "../type/recipe.dto"
import RecipeService from "../services/recipe.service.ts";
import BaseController from "./base.controller.ts";
import {recipeValidation, updateRecipeValidation,recipeQuerySchema,recipeStepValidation} from "../helper/validation/recipe.validation.ts"
import { UserDTO } from "@/type/auth.dto.ts";



class RecipeController extends BaseController {

  private recipeService: RecipeService;
  constructor(service: RecipeService) {
    super()
    this.recipeService = service;
  }

  public all = async (req: Request, res: Response,next: NextFunction) =>{
    
    try{
      const { tags, keyword } = recipeQuerySchema.parse(req.query);
      const conditions: RecipeDTOs.RecipeConditionsDTO = {
        tags:parseInt(tags),
        keyword:keyword
      }
      const data = await this.recipeService.all(conditions);
      this.success(res,data);
    }catch(e: unknown){
      next(e);
    }
    
  }

  public create = async (req: Request, res: Response,next: NextFunction) => {
    const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1])
    try{
      const input = recipeValidation.parse(req.body);

      const materials: RecipeDTOs.RecipeMaterialDTO[] = input.material.map(
        ({ name, number, unit }) => ({ name, number, unit })
      );
      
      const tags:RecipeDTOs.RecipeTagDTO[] = input.tags.map(
        ({ category }) => ({ category  })
      );

      const steps:RecipeDTOs.RecipeStepDTO[] = input.steps.map(
        ({ description,step }) => ({ description,step  })
      );


      const inputData: RecipeDTOs.RecipeDTO ={
        name: input.name,
        description:input.description,
        materials: materials,
        steps:steps,
        tags:tags,
        user_id:userData.id,
        servings:input.servings,
        video_link:input.video_link
      }
      res.send('123');
     // const createdData = await this.recipeService.create(inputData)
      //this.success(res,createdData);
    }catch(e: unknown){
        next(e)
    }
  }

  public find = async (req: Request, res: Response,next: NextFunction) => {
    
    try{
      const id = req.params.id;
      const data: RecipeDTOs.RecipeDTO = await this.recipeService.findUnique(parseInt(id))
      this.success(res,data);
    }catch(e: unknown){
      next(e);
    }
  }

  public update = async (req: Request, res: Response,next: NextFunction) => {
    try{
      const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1])
      const input = updateRecipeValidation.parse(req.body);

      const inputData: RecipeDTOs.RecipeDTO ={
        name: input.name,
        description:input.description,
        user_id:userData.id,
        servings:input.servings,
        video_link:input.video_link
      }
      const id = req.params.id;
      const data: RecipeDTOs.RecipeDTO = await this.recipeService.updateRecipe(parseInt(id),inputData)
      this.success(res,data);
    }catch(e: unknown){
      next(e);
    }
  }

  public delete = async(req: Request, res: Response,next: NextFunction) =>{
    
    try{
      const id = req.params.id;
      await this.recipeService.softDelete(parseInt(id))
      this.success(res);
    }catch(e: unknown){
      next(e);
    }
  }

  createRecipeSteps = async(req: Request, res: Response,next: NextFunction) => {
    try{
      const input = await recipeStepValidation.parse(req.body);

      res.send("success")
    }catch(e: unknown){
      next(e)
    }
  }
}

export default RecipeController;