import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/common/errors/AppError.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // 1. on caste proprement
  const error = err as Partial<AppError>;

  // 2. on récupère les valeurs avec fallback
  const statusCode = error.statusCode ?? 500;
  const name = error.name ?? "InternalServerError";
  const message = error.message ?? "Unexpected error";

  return res.status(statusCode).json({
    name,
    message,
  });
}
