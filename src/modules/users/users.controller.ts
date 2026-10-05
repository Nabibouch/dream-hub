import type { NextFunction, Request, Response } from "express";
import type { UserService } from "./users.service.js";
// import { checkId } from "../../utils/checkId.js";



export class UserController {
  constructor(private service: UserService) { }

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

  deleteUserById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedUser = await this.service.deleteUserById(id);
      return res.status(204).json(deletedUser);
    } catch (err) {
      next(err)
    }
  }
}
