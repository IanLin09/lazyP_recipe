import { PrismaClient, Prisma } from '@prisma/client'
import BaseRepository from './base.repository.ts'
import {RecipeDTO,RecipeConditionsDTO} from "../type/recipe.dto.ts"


class RecipeRepository extends BaseRepository<RecipeDTO> {

    constructor(prisma: PrismaClient) {
        super(prisma, 'recipe');
    }
    
    all = async(conditions: RecipeConditionsDTO): Promise<RecipeDTO> => {
      const result = await this.model.findMany({
        where: {
          AND: [
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
        include: {
          tags: true,
          materials: true,
        },
      });
      
      return result;
    }

    public create = async(data: RecipeDTO): Promise<RecipeDTO> => {
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
}

export default RecipeRepository