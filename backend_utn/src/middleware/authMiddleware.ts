import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretdev";

export interface IUserPayload {
  userId: string;
  email: string;
  role?: string;
}

export const authMiddleware = (req: Request & { user?: IUserPayload }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Invalid token format" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IUserPayload;
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware 