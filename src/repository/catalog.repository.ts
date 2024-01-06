import { ICataLogRepository, IProduct } from "../interfaces/catalog.interface";

export const products: IProduct[] = [];

export const CatalogRepository: ICataLogRepository = {
  create: (data: IProduct): Promise<IProduct> => {
    const { id, ...rest } = data;
    const product = {
      id: "1",
      ...rest,
    } as IProduct;
    products.push(product);
    return Promise.resolve(product);
  },

  update: (data: IProduct): Promise<IProduct> => {
    const { id, ...rest } = data;
    const product = {
      id: "1",
      ...rest,
    };
    const filteredProduct = products.filter((product) => product.id !== id);
    products.push(product, ...filteredProduct);
    return Promise.resolve(product);
  },

  delete: (id: string): Promise<string> => {
    const filteredProduct = products.filter((product) => product.id !== id);
    products.push(...filteredProduct);

    return Promise.resolve("Product deleted");
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
