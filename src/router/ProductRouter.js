import { Router } from "express";
import productsManagers from "../managers/ProductManager.js";
import { checkproductData } from "../middlewares/checkProductData.js";
import productDao from "../dao/product.dao.js";
import passport from "passport";

const ProductRouter = Router();

//-----------------GET-------------------------------

ProductRouter.get(
  "/",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { limit, page, sort, category, status } = req.query;
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
      };

      if (status) {
        const products = await productDao.getAll({ status }, options);
        return res.status(200).json({ status: "OK", products });
      }

      if (category) {
        const products = await productDao.getAll({ category }, options);
        return res.status(200).json({ status: "OK", products });
      }
      const products = await productDao.getAll({}, options);
      res.status(200).json({ status: "OK", products });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
);

ProductRouter.get(
  "/:id",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const productFound = await productDao.getById(id);
      if (!productFound)
        return res.status(404).json({
          status: "error",
          msg: `No existe el servicio con el id ${id}`,
        });
      res.status(200).json({ status: "ok", productFound });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

//-----------------POST-------------------------------

ProductRouter.post(
  "/",
  checkproductData,
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const body = req.body;
      const product = await productDao.create(body);
      res.status(201).json({ status: "ok", product });
      console.log("Producto agregado con exito!");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

//-----------------PUT-------------------------------

ProductRouter.put(
  "/:id",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productDao.update(id, body);
      res.status(200).json({ status: "ok", product });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

//-----------------DELETE-------------------------------

ProductRouter.delete(
  "/:id",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productDao.deleteOne(id);

      if (!product)
        return res.status(404).json({
          status: "error",
          msg: `No existe el producto con el id ${id}`,
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

export default ProductRouter;
