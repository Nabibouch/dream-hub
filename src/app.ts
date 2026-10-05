import './docs/zod-extend.js'; // ⚠️ à importer en tout premier, avant les schémas
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from './docs/generate-openapi.js';
import express from "express";
import userRouter from "./modules/users/users.route.js";
import authRouter from "./modules/auth/auth.route.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import './modules/users/users.docs.js';
// import './modules/auth/auth.docs.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateOpenApiDocument()));
app.use(errorHandler);

export default app;
