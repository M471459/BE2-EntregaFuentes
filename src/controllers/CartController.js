import { cartDAO } from "../dao/cartDAO.js";
import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { NegociosDAO } from "../dao/NegociosDAO.js";
import { ticketDAO } from "../dao/ticketDAO.js";
import { procesaErrores } from "../utils.js";
import { productDAO } from "../dao/productDAO.js";
import { cartService } from "../repository/CartService.js";
import { productsService } from "../repository/ProductService.js";

async function getCartsAll(req, res) {
  let carts = await cartService.getCartsAll();
  try {
    return res.status(200).json({ status: "OK", carts });
  } catch {
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function getCartBy(req, res) {
  const { id } = req.params;
  let cart = await cartService.getCartBy(id);
  try {
    if (cart === null) {
      console.log(cart);
      return res.status(404).json({
        error: "No existe el carrito",
      });
    }
    return res.status(200).json({ cart });
  } catch {
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function createCart(req, res) {
  const body = req.body;
  let cart = await cartService.createCart(body);
  try {
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function AddProducttoCart(req, res) {
  const { cid, pid } = req.params;
  let cart = await cartService.addProductToCart(cid, pid);
  try {
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}
async function Checkout(req, res) {
  //let orden = req.body;
  //let { nid, pedido } = orden;

  let { cid } = req.params;
  let { uid } = req.user._id;
  let usuario = await UsuariosDAO.getBy({ _id: req.user._id });
  //console.log(usuario);
  const cartFound = await cartService.getCartBy({ _id: cid });
  //console.log(cartFound.products);
  let pedido = cartFound.products;
  //console.log(pedido);
  const productos = await productsService.getProducts();

  try {
    let error = false;
    let detalleError = [];
    let productosNoAgregados = [];
    for (const item of pedido) {
      const producto = await productsService.getProductBy({
        _id: item.product,
      });
      if (producto) {
        let pid = producto._id;
        if (item.quantity > producto.stock) {
          //await cartDAO.deleteProductInCart(cid, item.product);
          //error = true;

          productosNoAgregados.push(item.product);

          /*detalleError.push({
            descrip: `Estos productos no fueron agregados por no tener stock ${productosNoAgregados}`,
          });*/
        } else {
          await productsService.updateProduct(pid, {
            $inc: { stock: -item.quantity },
          });
          item.descrip = producto.title;
          item.cantidad = item.quantity;
          item.precio = producto.price;
          item.subtotal = producto.price * item.quantity;
          await cartService.deleteProductInCart(pid);
        }
      } else {
        error = true;
        detalleError.push({
          descrip: `No existe el producto con id ${item.id}`,
        });
      }
    }

    if (error) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `Revisar detalle`, detalleError });
    } /*else {
      await cartDAO.deleteCart(cid);
    }*/

    //let nroOrden = Date.now();
    let fecha = new Date();
    pedido = pedido.filter(
      (item) => !productosNoAgregados.includes(item.product)
    );
    let amount = pedido.reduce((acum, items) => (acum += items.subtotal), 0);

    // let nuevaOrden="nuevo orden generada, a bar id: "+orden.nid
    let nuevaOrden = await ticketDAO.create({
      /*nroOrden,
      fecha,*/
      amount,
      detalle: pedido,
      purchaser: req.user.email,
    });

    usuario.pedidos.push({
      nroOrden: nuevaOrden._id,
    });
    await UsuariosDAO.updateUsuario(req.user._id, usuario); // Asegúrate de usar await
    res.setHeader("Content-Type", "application/json");

    cartFound.products = cartFound.products.filter((item) =>
      productosNoAgregados.includes(item.product)
    );

    await cartService.updateCart(cartFound._id, {
      products: cartFound.products,
    });

    return res.status(201).json({ orden: nuevaOrden, carrito: cartFound });
  } catch (error) {
    return procesaErrores(res, error);
  }
}

async function updateProductinCart(req, res) {
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
}

async function deleteProductInCart(req, res) {
  const { cid, pid } = req.params;
  try {
    const cart = await cartService.deleteProductInCart(cid, pid);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}

async function deleteAllProductsInCart(req, res) {
  let cart = await cartService.deleteAllProductsinCart(req, res);
  try {
    if (cart === null)
      return res.status(404).json({
        status: "error",
        msg: `No existe el carrito`,
      });
    return res.status(200).json({
      status: "OK",
      msg: `Los Productos han sido eliminados con éxito`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
}
export default {
  getCartsAll,
  getCartBy,
  createCart,
  AddProducttoCart,
  Checkout,
  updateProductinCart,
  deleteProductInCart,
  deleteAllProductsInCart,
};
