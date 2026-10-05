import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "./auth.service.js";



export class AuthController {
  constructor(private authService: AuthService) { };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      next(err)
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.login(req.body);
      return res.status(200).json(user);
    } catch (err) {
      next(err)
    }
  }
}
