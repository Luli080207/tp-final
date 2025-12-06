import rateLimit from "express-rate-limit";

export const rateLimitForAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: "Demasiados intentos, intentelo de nuevo mas tarde.",
});