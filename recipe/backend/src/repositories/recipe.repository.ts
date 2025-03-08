import { PrismaClient, Prisma } from '@prisma/client'
import BaseRepository from './base.repository.js'
import {RecipeDTO,RecipeConditionsDTO, CreateRecipeDTO} from "../type/recipe.dto.js"


class RecipeRepository extends BaseRepository<RecipeDTO> {

    constructor(prisma: PrismaClient) {
        super(prisma, 'recipe');
    }
    
    all = async(conditions: RecipeConditionsDTO): Promise<RecipeDTO> => {
      const result = await this.model.findMany({
        where: {
          AND: [
            ...(conditions.id
              ? [
                  {
                    user_id:conditions.id
                  },
                ]
              : []),
            ...(conditions.keyword?.length
              ? [
                  {
                    OR: [
                      { name: { contains: conditions.keyword, mode: 'insensitive' } }, // Match recipe name
                      {
                        materials: {
                          some: {
                            name: { contains: conditions.keyword, mode: 'insensitive' }, // Match material name
                          },
                        },
                      },
                    ],
                  },
                ]
              : []),
            ...(conditions.tags
              ? [
                  {
                    tags: {
                      some: {
                        category: conditions.tags, // Match any tag category
                      },
                    },
                  },
                ]
              : []),
          ],
        },
        orderBy: [
          {
            id: 'desc',
          },
          {
            name: 'desc',
          },
        ],
        include: {
          tags: true,
          materials: true,
        },
      });
      
      return result;
    }

    public create = async(data: CreateRecipeDTO): Promise<RecipeDTO> => {
        return this.model.create({
            data:{
                name: data.name,
                description:data.description,
                materials: {
                    createMany: {
                      data: data.materials
                    }
                  },
                  steps: {
                    createMany: {
                      data: data.steps
                    }
                  },
                  tags: {
                    createMany: {
                      data: data.tags
                    }
                  },
                user_id:data.user_id,
                servings:data.servings,
                video_link:data.video_link
            },
            include: {
                materials: true,
                steps: true,
                tags: true
            }
        });
    }

    public findById(id: number): Promise<RecipeDTO> {
      return this.model.findUnique({
          where:{id},
          include: {
            materials: true,
            steps: true,
            tags: true
          }
      });
    }

    update = async(id:number,data: RecipeDTO): Promise<RecipeDTO> =>{
      return this.model.update({
        where:{ 
          id:id
        },
        data:{
          name: data.name,
          description:data.description,
          materials: {
            upsert: data.materials.map((material) =>({
              where:{id:material.id || 0},
              create: material,
              update: material
            }))
          },
          steps: {
            upsert: data.steps.map((step) =>({
              where:{id:step.id || 0},
              create: step,
              update: step
            }))
          },
          tags: {
            upsert: {
              where:{id:data.tags.id || 0},
              create: data.tags,
              update: data.tags
            }
          },
          user_id:data.user_id,
          servings:data.servings,
          video_link:data.video_link
        },
        include: {
          materials: true,
          steps: true,
          tags: true
        }
      })
    }

    republic = async(id:number): Promise<RecipeDTO> => {
      return this.model.update({
        where:{id:id},
        data:{
          deleted_at:null
        }
      })
    }
}

export default RecipeRepository