import bcrypt from 'bcrypt';
import {UserDTO} from "../type/auth.dto"
import AuthRepository from '../repositories/auth.repository';
import { ThrowError } from '../helper/error.ts';


class AuthService{

    private AuthRepository : AuthRepository;

    constructor(repo:AuthRepository){
        this.AuthRepository = repo;
    }

    public login = async(data: UserDTO) =>{
        const userData = await this.AuthRepository.login(data);
        const result = await bcrypt.compare(data.password,userData.password);
        if (result){
            return userData;
        }else{
            throw new ThrowError(400,'Wrong email or password!')
        }
    }


    public create =  async(data: UserDTO) => {
        const salt: number = parseInt(process.env.BCRYPT_ROUNDS) || 10;
        data.password = await bcrypt.hash(data.password, salt);
        const createdData = await this.AuthRepository.create(data)
        return createdData;
    }
}

export default AuthService;