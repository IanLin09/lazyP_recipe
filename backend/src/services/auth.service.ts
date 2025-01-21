import bcrypt from 'bcrypt';
import {UserDTO} from "../type/auth.dto"
import AuthRepository from '../repositories/auth.repository';
import { ThrowError } from '../helper/error.ts';
import crypto from "crypto"
import { handleSendMail } from "../helper/mail.ts";



class AuthService{

    private AuthRepository : AuthRepository;

    constructor(repo:AuthRepository){
        this.AuthRepository = repo;
    }

    public login = async(data: UserDTO) =>{
        const userData = await this.AuthRepository.login(data);
        const result = await bcrypt.compare(data.password,userData.password);
        if (result){
            delete(userData["password"]);
            return userData;
        }else{
            throw new ThrowError(400,'Wrong email or password!')
        }
    }


    public create =  async(data: UserDTO) => {

        const exist =await this.AuthRepository.login(data)

        if (exist && exist.id) {
            throw new ThrowError(400,'Email already exists')
        }

        const salt: number = parseInt(process.env.BCRYPT_ROUNDS) || 10;
        data.password = await bcrypt.hash(data.password, salt);
        await this.AuthRepository.create(data)
    }

    forgotPassword = async(data: UserDTO) => {
        const exist =await this.AuthRepository.login(data)

        if (!exist){
            throw new ThrowError(400,"Can't find this email")
        }

        const tempPwd = await crypto.randomUUID().replace(/-/g, '');

        await this.AuthRepository.update(exist.id,{password:tempPwd})
        const template = (data) => `
        <h1>Hello</h1>
        <p>Here's your temprary password:${data.pwd}</p>
        `;

        
        const html = template({pwd:tempPwd});    
        handleSendMail("ianlin5190@gmail.com","Forgot Password",html)
        return tempPwd;
    }

    update = async(data:UserDTO) => {
        await this.AuthRepository.update(data.id,data)
    }
    
    updatePassword = async(data: UserDTO) => {
        const userData = await this.AuthRepository.findById(data.id);
        const result = await bcrypt.compare(data.password,userData.password);
        if (result){
            await this.AuthRepository.update(data.id,data);
        }else{
            throw new ThrowError(400,'Wrong password')
        }
    }
}

export default AuthService;