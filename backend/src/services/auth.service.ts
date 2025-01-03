import bcrypt from 'bcrypt';
import {UserDTO} from "../type/auth.dto"
import AuthRepository from '../repositories/auth.repository';


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
            console.log("password error");
            //throw new error
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