import {Response} from "express";
import { getData } from "../helper/redis.ts"
import { UserDTO } from "@/type/auth.dto.ts";

export default class BaseController{
    public success = <T>(res: Response,data?: T) => {
        res.send({
            status: 200,
            message: 'success',
            data: data,
        });
    }

    public errorReturn = (res: Response,code: number = 400,msg: string) => {
        res.send({
            status: code,
            message: msg,
        });
    }

    public userData = async <UserDTO>(token:string) => {
        const storeData:string = await getData(token);
        const userData:UserDTO = JSON.parse(storeData)
        return userData;
    }

}
