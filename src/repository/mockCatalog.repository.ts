import { ICataLogRepository, IProduct } from "../interfaces/catalog.interface";

export const products: IProduct[] = [];

export const mockCatalogRepository: ICataLogRepository = {
  create: (data: IProduct): Promise<IProduct> => {
    const { id, ...rest } = data;
    const mockProduct = {
      id: data.id ? "" : "1",
      ...rest,
    } as IProduct;
    products.push(mockProduct);
    return Promise.resolve(mockProduct);
  },
  update: (data: IProduct): Promise<IProduct> => {
    const index = products.findIndex((product) => product.id === data.id);

    if (index === -1) {
      throw new Error("Product not found");
    }

    if (index !== -1) {
      products[index] = data;
    }
    return Promise.resolve(data);
  },
  delete: (id: string): Promise<string> => {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error("Product not found");
    }

    if (index !== -1) {
      products.splice(index, 1);
    }
    return Promise.resolve(id);
  },
  find: (limit: number, offset: number): Promise<IProduct[]> => {
    const result = products.slice(offset, offset + limit);
    return Promise.resolve(result);
  },
  findOne: (id: string): Promise<IProduct> => {
    const result = products.find((product) => product.id === id);

    if (!result) {
      throw new Error("Product not found");
    }

    return Promise.resolve(result);
  },
};
