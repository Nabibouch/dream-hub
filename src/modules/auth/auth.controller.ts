import type { Request, Response } from "express";
import type { AuthService } from "./auth.service.js";



export class AuthController {
  constructor(private AuthUser: AuthService) { };

  async register(req: Request, res: Response) {
    try {
      const user = await this.AuthUser.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
      };
    };
  };


}
