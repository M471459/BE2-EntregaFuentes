import { Router } from "express";
import cartDao from "../dao/cart.dao.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import passport from "passport";
import { passportCall } from "../utils.js";

const CartRouter = Router();
CartRouter.use(passportCall("current"));

//-----------------GET-------------------------------

CartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartDao.getAllCarts();
    res.send(carts);
    return carts;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartFound = await cartDao.getbyId(id);
    if (!cartFound)
      return res.status(404).json({
        status: "error",
        msg: `No existe el carrito con el id ${id}`,
      });
    res.status(200).json({ status: "ok", cartFound });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

//-----------------POST-------------------------------

CartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create();
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.post("/:cid/product/:pid", checkProductAndCart, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.addProductToCart(cid, pid);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

//-----------------PUT-------------------------------

CartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartDao.updateProductinCart(cid, pid, quantity);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

//-----------------DELETE-------------------------------

CartRouter.delete(
  "/:cid/product/:pid",
  checkProductAndCart,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartDao.deleteProductInCart(cid, pid);
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

CartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getbyId(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "carrito no encontrado" });
    const cartResponse = await cartDao.deleteAllProductsInCart(cid);
    res.status(201).json({ status: "ok", cart: cartResponse });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default CartRouter;
