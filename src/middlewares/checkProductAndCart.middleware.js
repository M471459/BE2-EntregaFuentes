import { request, response } from "express";
import { productDAO } from "../dao/productDAO.js";
import { cartDAO } from "../dao/cartDAO.js";

export const checkProductAndCart = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { cid, pid } = req.params;
    const product = await productDAO.getBy({ _id: pid });
    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    const cart = await cartDAO.getBy({ _id: cid });
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "Carrito no encontrado" });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
