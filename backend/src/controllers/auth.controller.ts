import {NextFunction, Request, Response} from "express";
import { z } from "zod";
import {UserDTO} from "../type/auth.dto"
import AuthService from "../services/auth.service";
import BaseController from "./base.controller.ts";
import crypto from "crypto"
import { storeData,forgetData } from "../helper/redis.ts"
import { handleSendMail } from "../helper/mail.ts";
import {UserDataValidation,UserEmailNameValidation,UpdatePasswordValidation} from "../helper/validation/auth.validation.ts"



class AuthController extends BaseController {

  private authService: AuthService;
  constructor(service: AuthService) {
    super()
    this.authService = service;
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
      this.success(res,{...inputData,token: token})
      
    }catch(e: unknown){
      next(e)
    }
  }

  public create = async (req: Request, res: Response,next: NextFunction) => {

    try{
      const input = UserDataValidation.parse(req.body);
      const inputData: UserDTO = {
        email: input.email,
        password: input.password,
      }
      const createdData = await this.authService.create(inputData)
      this.success(res);
    }catch(e: unknown){
      next(e)
    }
  }

  forgot = async (req: Request, res: Response,next: NextFunction) => {
    try{
      const input = UserEmailNameValidation.parse(req.body);
      const inputData: UserDTO = {
        email: input.email
      }
      const result = await this.authService.forgotPassword(inputData)
      
      this.success(res,result);
    }catch(e: unknown){
      next(e)
    }
  }

  logout = async (req: Request, res: Response,next: NextFunction) => {
    try{
      forgetData(req.headers.authorization?.split(' ')[1]);
      this.success(res);
    }catch(e: unknown){
      next(e)
    }
  }

  userInfo = async (req: Request, res: Response,next: NextFunction) => {
    try{
      const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1]);
      this.success(res,userData);
    }catch(e: unknown){
      next(e)
    }
  }

  updateUserInfo = async (req: Request, res: Response,next: NextFunction) => {
    const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1])
    try{
      const input = UserEmailNameValidation.parse(req.body);
      const inputData: UserDTO = {
        id:userData.id,
        email: input.email,
        name:input.name
      }
      const result = await this.authService.update(inputData)
      
      this.success(res,result);
    }catch(e: unknown){
      next(e)
    }
  }

  updatePassword = async (req: Request, res: Response,next: NextFunction) => {
    const userData: UserDTO = await this.userData(req.headers.authorization?.split(' ')[1])
    try{
      const input = UpdatePasswordValidation.parse(req.body);
      const inputData: UserDTO = {
        id:userData.id,
        email:userData.email,
        password:input.newPassword
      }
      await this.authService.forgotPassword(inputData)
      this.success(res);
    }catch(e: unknown){
      next(e)
    }
  }
}

export default AuthController;