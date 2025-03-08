import {NextFunction, Request, Response} from "express";
import * as RecipeDTOs from "../type/recipe.dto.js"
import RecipeService from "../services/recipe.service.js";
import BaseController from "./base.controller.js";
import {recipeValidation,recipeQuerySchema,recipeStepValidation} from "../helper/validation/recipe.validation.js"
import { UserDTO } from "../type/auth.dto.js";

class RecipeController extends BaseController {

  private recipeService: RecipeService;
  constructor(service: RecipeService) {
    super()
    this.recipeService = service;
  }

  public all = async (req: Request, res: Response,next: NextFunction) =>{

    try{
      const { tags, keyword,person } = recipeQuerySchema.parse(req.query);

      let conditions: RecipeDTOs.RecipeConditionsDTO = {
        tags:parseInt(tags),
        keyword:keyword
      }

      const data = await this.recipeService.all(conditions);
      this.success(res,data);
    }catch(e: unknown){
      next(e);
    }
  }

  public myRecipe = async (req: Request, res: Response,next: NextFunction) =>{

    try{
      const token = req.signedCookies.auth_token || req.cookies.auth_token;
      const userData: UserDTO = await this.userData(token)
      const conditions: RecipeDTOs.RecipeConditionsDTO = {id: userData.id}

      const data = await this.recipeService.all(conditions);
      this.success(res,data);
    }catch(e: unknown){
      next(e);
    }
  }

  public create = async (req: Request, res: Response,next: NextFunction) => {
    const token = req.signedCookies.auth_token || req.cookies.auth_token;
    const userData: UserDTO = await this.userData(token)
    try{
      
      const files = req.files;
      const input = recipeValidation.parse(req.body);
      
      const materials: RecipeDTOs.CreateRecipeMaterialDTO[] = input.materials.map(
        ({ name, number, unit }) => ({ name, number, unit })
      );
      
      //Zod will change the type to nullable, so it can't use input.tag directly
      const tags:RecipeDTOs.CreateRecipeTagDTO = {
        category: input.tags.category
      };

      const steps:RecipeDTOs.CreateRecipeStepDTO[] = input.steps.map((step,index) =>{
        
        if (Array.isArray(files)) {
          const file = files.find((f) => f.fieldname === `steps[${index}][image_file]`);
          return {
            step:Number(step.step),
            description:step.description,
            image_link: file ? file.path : ""
          }
        }
        
        return {
          step:Number(step.step),
          description:step.description,
        }
    });


      const inputData: RecipeDTOs.CreateRecipeDTO ={
        name: input.name,
        description:input.description,
        materials: materials,
        steps:steps,
        tags:tags,
        user_id:userData.id,
        servings:input.servings,
        video_link:input.video_link
      }

      const createdData = await this.recipeService.create(inputData)
      this.success(res,createdData);
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

      const token = req.signedCookies.auth_token || req.cookies.auth_token;
      const userData: UserDTO = await this.userData(token)
      try{
        const files = req.files;
        const input = recipeValidation.parse(req.body);
        
        const materials: RecipeDTOs.RecipeMaterialDTO[] = input.materials.map(
          ({ id,name, number, unit }) => ({ id,name, number, unit })
        );
        
        //Zod will change the type to nullable, so it can't use input.tag directly
        const tags:RecipeDTOs.RecipeTagDTO = {
          id:input.tags.id,
          category: input.tags.category
        };

        const steps:RecipeDTOs.RecipeStepDTO[] = input.steps.map((step,index) =>{
          
          if (Array.isArray(files)) {
            const file = files.find((f) => f.fieldname === `steps[${index}][image_file]`);
            return {
              id:step.id,
              step:Number(step.step),
              description:step.description,
              image_link: file ? file.path : ""
            }
          }
          
          return {
            id:step.id,
            step:Number(step.step),
            description:step.description,
          }
      });

      const inputData: RecipeDTOs.RecipeDTO ={
        id:input.id,
        name: input.name,
        description:input.description,
        materials: materials,
        steps:steps,
        tags:tags,
        user_id:userData.id,
        servings:input.servings,
        video_link:input.video_link
      }
      await this.recipeService.updateRecipe(input.id,inputData)
      this.success(res);
    }catch(e: unknown){
        next(e)
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