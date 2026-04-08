import type { Request, Response } from "express";
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

  getUser = async (req: Request<{id: string}>, res: Response) => {
    try {
      // const id = checkId(req.params);
      const { id } = req.params
      const user = await this.service.getUserById(id);
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues });
      }
      return res.status(500).json({
        error: err instanceof Error ? err.message : "Internal server error"
      });
    }
  }
}
