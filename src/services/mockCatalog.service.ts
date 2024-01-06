import { IProduct } from "../interfaces/catalog.interface";
import { mockCatalogRepository } from "../repository/mockCatalog.repository";

const product = mockCatalogRepository;
export const mockCatalogService = {
  async createProduct(data: IProduct) {
    const result = await product.create(data);
    if (!result.id) throw new Error("Unable to create product");
    return result;
  },
  async updateProduct(data: IProduct) {
    const result = await product.update(data);
    return result;
  },

  async deleteProduct(id: string) {
    const result = await product.delete(id);
    return result;
  },

  async getProducts(limit: number, offset: number) {
    const result = await product.find(limit, offset);
    return result;
  },

  async getProduct(id: string) {
    const result = await product.findOne(id);
    return result;
  },
};
