import { Router } from "express";
import * as productCtrl from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { zodValidate } from "../middleware/zodVidateMiddleware";
import { z } from "zod";

const router = Router();

router.get("/", productCtrl.list);
router.get("/;id", productCtrl.getOne);

const productCreateSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  price: z.number().positive(),
  description: z.string().optional(),
  image: z.string().optional(),
});

router.post("/", authMiddleware, zodValidate(productCreateSchema), productCtrl.create);
router.put("/:id", authMiddleware, zodValidate(productCreateSchema.partial()), productCtrl.update);
router.delete("/:id", authMiddleware, productCtrl.remove);


export default router;