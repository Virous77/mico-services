import express from "express";
import { CatalogService } from "../services/catalog.service";

const router = express.Router();

router.post("/product", async (req, res, next) => {
  try {
    const result = await CatalogService.createProduct(req.body);
    console.log(result);
    res.status(201).json({ data: result, message: "Product created" });
  } catch (error) {
    next(error);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const result = await CatalogService.getProducts(10, 0);
    res.status(200).json({ data: result, message: "Products retrieved" });
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const result = await CatalogService.getProduct(req.params.id);
    res.status(200).json({ data: result, message: "Product retrieved" });
  } catch (error) {
    next(error);
  }
});

router.put("/product/:id", async (req, res, next) => {
  try {
    const result = await CatalogService.updateProduct(req.body);
    res.status(200).json({ data: result, message: "Product updated" });
  } catch (error) {
    next(error);
  }
});

router.delete("/product/:id", async (req, res, next) => {
  try {
    const result = await CatalogService.deleteProduct(req.params.id);
    res.status(200).json({ data: result, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
