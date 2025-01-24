
import {StoreCommentDTO} from "../type/store.dto.js"
import StoreRepository from '../repositories/store.repository.js';


class StoreService{

    private StoreRepository : StoreRepository;

    constructor(repo:StoreRepository){
        this.StoreRepository = repo;
    }

    public create =  async(data: StoreCommentDTO) => {
    
        const createdData = await this.StoreRepository.create(data)
        return createdData;
    }
}

export default StoreService;