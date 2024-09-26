import { Router } from "express";
import { cartDAO } from "../dao/cartDAO.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { passportCall } from "../utils.js";
import CartController from "../controllers/CartController.js";
import { auth } from "../middlewares/auth.js";

const CartRouter = Router();
CartRouter.use(passportCall("current"));

//-----------------GET-------------------------------

CartRouter.get("/", CartController.getCartsAll);

/*CartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartDAO.getAll();
    res.send(carts);
    return carts;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});
*/

CartRouter.get("/:id", CartController.getCartBy);
/*CartRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartFound = await cartDAO.getBy({ _id: id });
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
*/
//-----------------POST-------------------------------

CartRouter.post("/", CartController.createCart);
/*CartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartDAO.create();
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});
*/
CartRouter.post(
  "/:cid/product/:pid",
  checkProductAndCart,
  auth("user"),
  CartController.AddProducttoCart
);

CartRouter.post("/:cid/purchase", auth("user"), CartController.Checkout);
/*CartRouter.post("/:cid/product/:pid", checkProductAndCart, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDAO.addProductToCart(cid, pid);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});
*/
//-----------------PUT-------------------------------

CartRouter.put("/:cid/product/:pid", CartController.updateProductinCart);
/*CartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartDAO.updateProductinCart(cid, pid, quantity);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});
*/
//-----------------DELETE-------------------------------

CartRouter.delete(
  "/:cid/product/:pid",
  checkProductAndCart,
  CartController.deleteProductInCart
);
/*CartRouter.delete(
  "/:cid/product/:pid",
  checkProductAndCart,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartDAO.deleteProductInCart(cid, pid);
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);
*/
CartRouter.delete("/:cid", CartController.deleteAllProductsInCart);
CartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDAO.getBy({ _id: cid });
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "carrito no encontrado" });
    const cartResponse = await cartDAO.deleteAllProductsInCart(cid);
    res.status(201).json({ status: "ok", cart: cartResponse });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default CartRouter;
