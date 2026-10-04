import { Router } from "express";
import { UserRepository } from "./users.repository.js";
import { UserService } from "./users.service.js";
import { UserController } from "./users.controller.js";
import { validation } from "@/middlewares/validation.js";
import { createUserSchema } from "./users.zodschema.js";
import { db } from "@/db/index.js";



const router = Router();

const repository = new UserRepository(db);
const service = new UserService(repository);
const controller = new UserController(service);

router.post("/", validation(createUserSchema), controller.createUser);
router.get("/:id", controller.getUserById);
router.get("/", controller.getUser);
router.delete("/:id", controller.deleteUserById);

export default router
