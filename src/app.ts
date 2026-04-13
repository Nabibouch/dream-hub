import express from "express";
import router from "./modules/users/users.route.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", router);
app.use(errorHandler)

export default app;
