import { Router } from "express";
import { checkproductData } from "../middlewares/checkProductData.js";
import { passportCall } from "../utils.js";
import ProductController from "../controllers/ProductController.js";
import { auth } from "../middlewares/auth.js";
import { productDAO } from "../dao/productDAO.js";

const ProductRouter = Router();

ProductRouter.use(passportCall("current"));
ProductRouter.get("/", ProductController.getProductsAll);
ProductRouter.get("/:id", ProductController.getProductBy);
ProductRouter.post(
  "/",
  checkproductData,
  auth("admin"),
  ProductController.createProduct
);
ProductRouter.put("/:id", auth("admin"), ProductController.updateProduct);
ProductRouter.delete("/:id", auth("admin"), ProductController.deleteProduct);
export default ProductRouter;
