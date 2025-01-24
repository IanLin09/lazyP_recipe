import { PrismaClient, Prisma } from '@prisma/client'
import BaseRepository from './base.repository.js'
import {StoreCommentDTO} from "../type/store.dto.js"

class StoreRepository extends BaseRepository<StoreCommentDTO> {

    constructor(prisma: PrismaClient) {
        super(prisma, 'user');
    }
}

export default StoreRepository