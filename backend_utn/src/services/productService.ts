import Product from "../model/ProductModel";
import IProduct from "../interfaces/IProduct";

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  limit?: number;
  offset?: number;
};

export const listProducts = async (filters: Filters) => {
  const query: any = {};
  if (filters.category) query.category = filters.category;
  if (filters.minPrice !== undefined) query.price = { ...(query.price || {}), $gte: filters.minPrice};
  if (filters.maxPrice !== undefined) query.price = { ...(query.price || {}), $lte: filters.maxPrice};
  if (filters.name) query.name = {$regex: filters.name, $options: "i"};

  const q = Product.find(query).sort({createdAt: -1});
  if (filters.limit) q.limit(filters.limit);
  if (filters.offset) q.skip(filters.offset);

  const results = await q.exec();
  return results;
};

export const createProduct = async (payload: Partial<IProduct>) => {
  const p = new Product(payload);
  return await p.save();
};

export const getProductById = async (id: string) => {
  return await Product.findById(id).exec();
};

export const updateProduct = async (id: string, payload: Partial<IProduct>) => {return await Product.findByIdAndUpdate(id, payload, {new: true}).exec();
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id).exec();
};

