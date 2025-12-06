import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, minPrice, maxPrice, name, limit, offset } = req.query;
    const filters = {
      category: category as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number (maxPrice) : undefined,
      name: name as string | undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number (offset) : undefined,
    };
    const products = await productService.listProducts(filters);
    res.json(products);
  } catch (err) {
    next(err);
  }
  };

  export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const p = await productService.getProductById(req.params.id);
      if (!p) return res.status(404).json({ message: "No se encontro"});
      res.json(p);
    } catch (err) {
      next(err);
    }
  };

  export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newP = await productService.createProduct(req.body);
      res.status(201).json(newP);
    } catch (err) {
      next(err);
    }
  };

  export const update = async (req:  Request, res: Response, next: NextFunction) => {
    try {
      const updated = await productService.updateProduct(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next (err);
    }
  };

  export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      res.json({ deleted });
    } catch (err) {
      next(err);
    }
  };
