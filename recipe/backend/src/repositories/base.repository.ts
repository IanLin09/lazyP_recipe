import { PrismaClient, Prisma } from '@prisma/client';

interface IBaseRepository<T>{
    create(data: T): Promise<T>;
    findById(id:number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T>;
    softDelete(id: number)
//     delete(id: number): Promise<T>;
}

class BaseRepository<T> implements IBaseRepository<T>{
    protected prisma: PrismaClient;
    protected model: any;

    constructor(prisma: PrismaClient, model: string) {
        this.prisma = prisma;
        this.model = prisma[model];
    }

    async create(data: T): Promise<T> {
        return await this.model.create({
            data
        });
    }

    async findById(id:number): Promise<T> {
        return await this.model.findUnique({
            where:{id}
        });
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        return await this.model.update({
            where: { id },
            data
        });
    }

    async softDelete(id: number) {
       
        const result = await this.model.update({
            where: { id:id },
            data:{
                deleted_at:new Date()
            }
        });
    }

    async delete(id: number): Promise<T> {
        return this.model.delete({
            where: { id }
        });
    }
}

export default BaseRepository;