import { PrismaClient, Prisma } from '@prisma/client'
import BaseRepository from './base.repository.ts'
import {StoreCommentDTO} from "../type/store.dto.ts"

class StoreRepository extends BaseRepository<StoreCommentDTO> {

    constructor(prisma: PrismaClient) {
        super(prisma, 'user');
    }
}

export default StoreRepository