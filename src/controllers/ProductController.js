//import { ProductService } from "../repository/ProductService.js";
import { productDAO } from "../dao/productDAO.js";

async function getProductsAll(req, res) {
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
      const products = await productDAO.getAll({ status }, options);
      return res.status(200).json({ status: "OK", products });
    }

    if (category) {
      const products = await productDAO.getAll({ category }, options);
      return res.status(200).json({ status: "OK", products });
    }
    const products = await productDAO.getAll({}, options);
    res.status(200).json({ status: "OK", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function getProductBy(req, res) {
  try {
    const { id } = req.params;
    const productFound = await productDAO.getBy({
      _id: id,
    });
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

async function createProduct(req, res) {
  try {
    console.log("Hola");
    const body = req.body;
    const product = await productDAO.create(body);
    res.status(201).json({ status: "ok", product });
    console.log("Producto agregado con exito!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productDAO.update(id, body);
    res.status(200).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productDAO.deleteOne({ _id: id });
    if (!product)
      return res.status(404).json({
        status: "error",
        msg: `No existe el producto con el id ${id}`,
      });
    return res.status(200).json({
      status: "OK",
      msg: `El producto con el id ${id} ha sido eliminado con éxito`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

export default {
  getProductsAll,
  getProductBy,
  createProduct,
  updateProduct,
  deleteProduct,
};
