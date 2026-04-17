import type { NextFunction, Request, Response } from "express";
import type { UserService } from "./users.service.js";
import { ZodError } from "zod"
// import { checkId } from "../../utils/checkId.js";



export class UserController {
  constructor(private service: UserService) { }

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.service.createUser(req.body);
        return res.status(201).json(user)
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues });
      }
      return res.status(500).json({
        error: err instanceof Error ? err.message : "Internal server error"
      });
  }
  }

  getUserById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
      // const id = checkId(req.params);
      const { id } = req.params
      const user = await this.service.getUserById(id);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.query.email as string | undefined;
      if (email) {
        const user = await this.service.getUserByEmail(email);
        return res.status(200).json(user);
      }
      const users = await this.service.getAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

}
