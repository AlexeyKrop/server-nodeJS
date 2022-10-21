import { validationResult } from "express-validator";
import {Request, NextFunction, Response} from "express";

export const middlewares = {
  inputValidationMiddleWare(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
      next()
    }
  }
}