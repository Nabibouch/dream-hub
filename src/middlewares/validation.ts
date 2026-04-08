import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validation =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) return res.status(400).json({
      message: "Erreur lors de la validation de la donnée",
      error : result.error.flatten()
    });

    req.body = result.data;
    next();
  };
