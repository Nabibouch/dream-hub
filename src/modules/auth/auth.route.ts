import { Router } from "express";
import { db } from "@/db/index.js";
import {AuthRepository} from "@/modules/auth/auth.repository.js";
import {AuthService} from "@/modules/auth/auth.service.js";
import {AuthController} from "@/modules/auth/auth.controller.js";
import {validation} from "@/middlewares/validation.js";
import {loginSchema, registerSchema} from "@/modules/auth/auth.zodschema.js";



const router = Router();


const repository = new AuthRepository(db);
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post('register', validation(registerSchema), controller.register);
router.post('login', validation(loginSchema), controller.login);

export default router;