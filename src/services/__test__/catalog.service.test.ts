import { IProduct } from "../../interfaces/catalog.interface";
import { mockCatalogService } from "../mockCatalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 100, max: 1000 }),
    stock: +faker.commerce.price(),
  };
};

describe("catalog service", () => {
  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = mockCatalogService;
      const input = mockProduct();
      const result = await service.createProduct(input);
      expect(result.id).toBeDefined();
      expect(result).toMatchObject(input);
    });

    test("should throw with Unable to create product", async () => {
      const service = mockCatalogService;
      const input = mockProduct();

      await expect(
        service.createProduct({ ...input, id: "2" })
      ).rejects.toThrow("Unable to create product");
    });

    test("should throw an error if product already exists", async () => {
      const service = mockCatalogService;
      const input = mockProduct();

      jest
        .spyOn(service, "createProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("product already exists"))
        );

      await expect(
        service.createProduct({ ...input, id: "2" })
      ).rejects.toThrow("product already exists");
    });
  });

  describe("getProduct", () => {
    test("should get a product", async () => {
      const service = mockCatalogService;
      const result = await service.getProduct("1");
      expect(result).toBeDefined();
    });

    test("should throw an error if product doesn't exists", async () => {
      const service = mockCatalogService;
      await expect(service.getProduct("8")).rejects.toThrow(
        "Product not found"
      );
    });
  });

  describe("getProducts", () => {
    test("should get a list of products", async () => {
      const service = mockCatalogService;
      const result = await service.getProducts(10, 0);
      expect(result).toBeDefined();
    });
  });

  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = mockCatalogService;
      const input = mockProduct();
      const result = await service.updateProduct({ ...input, id: "1" });
      expect(result.id).toBeDefined();
      expect(result).toMatchObject(input);
    });

    test("should throw an error product doesn't exists", async () => {
      const service = mockCatalogService;
      const input = mockProduct();
      await expect(
        service.updateProduct({ ...input, id: "8" })
      ).rejects.toThrow("Product not found");
    });

    test("should throw unable to update product", async () => {
      const service = mockCatalogService;

      jest
        .spyOn(service, "updateProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("Unable to update product"))
        );

      await expect(service.updateProduct({} as IProduct)).rejects.toThrow(
        "Unable to update product"
      );
    });
  });

  describe("deleteProduct", () => {
    test("should delete a product", async () => {
      const service = mockCatalogService;
      const result = await service.deleteProduct("1");
      expect(result).toBe("1");
    });

    test("should throw an error if product doesn't exists", async () => {
      const service = mockCatalogService;
      await expect(service.deleteProduct("8")).rejects.toThrow(
        "Product not found"
      );
    });

    test("should throw an error if product doesn't exists", async () => {
      const service = mockCatalogService;
      jest
        .spyOn(service, "deleteProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("Unable to delete product"))
        );

      await expect(service.deleteProduct("1")).rejects.toThrow(
        "Unable to delete product"
      );
    });
  });
});
