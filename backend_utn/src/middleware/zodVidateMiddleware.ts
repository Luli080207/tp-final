import { Request, Response, NextFunction} from "express";
import { ZodTypeAny } from "zod";

export const zodValidate = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    return next();
  } catch (e: any) {
    return res.status(422). json({ errors: e.errors || e });
  }
};