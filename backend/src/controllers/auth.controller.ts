import {NextFunction, Request, Response} from "express";
import { z } from "zod";
import {UserDTO} from "../type/auth.dto"
import AuthService from "../services/auth.service";
import BaseController from "./base.controller.ts";
import crypto from "crypto"
import { storeData,getData } from "../helper/redis.ts"
import { handleSendMail } from "../helper/mail.ts";

const UserDataValidation = z.object({
  name: z.string().optional(),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email("This is not a valid email.").nullish().pipe(z.string()),
  password: z.string({
    required_error: "Password is required"
  }).min(8,{message:"password required at least 8 characters long"}).nullish().pipe(z.string()),
});

class AuthController extends BaseController {

  private authService: AuthService;
  constructor(service: AuthService) {
    super()
    this.authService = service;
  }

  public async test(req: Request, res: Response,next: NextFunction) {
    const data = await getData("440c5686d2bf8f92aefb7b6def747f23c23aeff51a47f173632198e42bc75309");
    res.send(data);
  }

  emailAuthorization = async (req: Request, res: Response,next: NextFunction) => {
    handleSendMail("j135246789@gmail.com","test","just testing!")
    this.success(res);
  }

  public login = async (req: Request, res: Response,next: NextFunction) => {
    try{
      const input = UserDataValidation.parse(req.body);
      let  inputData: UserDTO = {
        email: input.email,
        password: input.password,
      }
      const userData = this.authService.login(inputData);

      inputData = await userData
      const token = crypto.randomBytes(32).toString('hex');
      storeData(token,inputData,3600);
      this.success(res,{token: token})
      
    }catch(e: unknown){
      next(e)
    }
  }

  public create = async (req: Request, res: Response,next: NextFunction) => {

    try{
      const input = UserDataValidation.parse(req.body);
      const inputData: UserDTO = {
        name: input.name,
        email: input.email,
        password: input.password,
      }
      const createdData = await this.authService.create(inputData)
      this.success(res,createdData);
    }catch(e: unknown){
      next(e)
    }
  }
}

export default AuthController;