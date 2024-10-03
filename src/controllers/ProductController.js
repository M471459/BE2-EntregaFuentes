//import { ProductService } from "../repository/ProductService.js";
import { productDAO } from "../dao/productDAO.js";
import { productsService } from "../repository/ProductService.js";

async function getProductsAll(req, res) {
  const { limit, page, sort, category, status } = req.query;
  let products = await productsService.getProducts(
    limit,
    page,
    sort,
    category,
    status
  );
  try {
    return res.status(200).json({ status: "OK", products });
  } catch {
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function getProductBy(req, res) {
  const { id } = req.params;
  let product = await productsService.getProductBy(id);
  try {
    if (product === null) {
      return res.status(404).json({
        error: "No existe el producto",
      });
    }
    return res.status(200).json({ product });
  } catch {
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function createProduct(req, res) {
  const body = req.body;
  let product = await productsService.createProduct(body);
  try {
    res.status(201).json({ status: "ok", product });
    console.log("Producto agregado con exito!");
  } catch {
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const body = req.body;
  let product = await productsService.updateProduct(id, body);
  try {
    res.status(200).json({ status: "ok", product });
  } catch {
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  let product = await productsService.deleteProduct(id);
  try {
    if (product === null)
      return res.status(404).json({
        status: "error",
        msg: `No existe el producto`,
      });
    return res.status(200).json({
      status: "OK",
      msg: `El producto  ha sido eliminado con éxito`,
    });
  } catch {
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
  //res.status(200).json();
}

/*async function deleteProduct(req, res) {
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
*/
export default {
  getProductsAll,
  getProductBy,
  createProduct,
  updateProduct,
  deleteProduct,
};
