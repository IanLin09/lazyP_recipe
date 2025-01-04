import { PrismaClient, Prisma } from '@prisma/client'
import BaseRepository from './base.repository.ts'
import {UserDTO} from "../type/auth.dto"

class AuthRepository extends BaseRepository<UserDTO> {

    constructor(prisma: PrismaClient) {
        super(prisma, 'user');
    }

    public login = async(data: UserDTO): Promise<UserDTO> => {
        return this.model.findFirst({
            where:{
                email: data.email,
                active: true,
            }
        });
    }

    public create = async(data: UserDTO): Promise<UserDTO> => {
        return this.model.create({
            data
        });
    }
}

export default AuthRepository