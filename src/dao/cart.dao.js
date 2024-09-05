import { cartModel } from "./models/cart.model.js";

const getAllCarts = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getbyId = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  const ProductInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } },
    { new: true }
  );
  if (!ProductInCart) {
    await cartModel.updateOne(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }
  const cart = await cartModel.findById(cid);
  return cart;
};

const updateProductinCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );
};

const deleteProductInCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);
  const productsFilter = cart.products.filter((prod) => prod.product !== pid);
  const cartResponse = await cartModel.findByIdAndUpdate(
    cid,
    { $set: { products: productsFilter } },
    { new: true }
  );
  return cartResponse;
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(
    cid,
    {
      $set: { products: [] },
    },
    { new: true }
  );
};

export default {
  getbyId,
  create,
  addProductToCart,
  getAllCarts,
  deleteProductInCart,
  deleteAllProductsInCart,
  updateProductinCart,
};
