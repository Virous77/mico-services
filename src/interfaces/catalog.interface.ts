export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ICataLogRepository {
  create(data: IProduct): Promise<IProduct>;
  update(data: IProduct): Promise<IProduct>;
  delete(id: string): Promise<string>;
  find(limit: number, offset: number): Promise<IProduct[]>;
  findOne(id: string): Promise<IProduct>;
}
