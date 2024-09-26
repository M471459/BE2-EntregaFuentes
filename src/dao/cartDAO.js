import { cartModel } from "./models/cart.model.js";

export class cartDAO {
  static async getAll() {
    const carts = await cartModel.find();
    return carts;
  }

  static async getBy(filtro = {}) {
    const cart = await cartModel.findOne(filtro).lean();
    return cart;
  }

  static async create(data) {
    const cart = await cartModel.create(data);
    return cart;
  }

  static async addProductToCart(cid, pid) {
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
  }

  static async updateProductinCart(cid, pid, quantity) {
    const cart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );
  }

  static async update(cartId, updatedData) {
    try {
      const updatedCart = await cartModel.findByIdAndUpdate(
        cartId,
        updatedData,
        {
          new: true, // Retorna el documento actualizado
        }
      );
      return updatedCart;
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw error;
    }
  }
  static async deleteProductInCart(cid, pid) {
    /*const cart = await cartModel.findById(cid);
    const productsFilter = cart.products.filter((prod) => prod.product !== pid);
    const cartResponse = await cartModel.findByIdAndUpdate(
      cid,
      { $set: { products: productsFilter } },
      { new: true }
    );*/
    const cartResponse = await cartModel.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
    return cartResponse;
  }

  static async deleteAllProductsInCart(cid) {
    const cart = await cartModel.findByIdAndUpdate(
      cid,
      {
        $set: { products: [] },
      },
      { new: true }
    );
  }
  static async deleteCart(cid) {
    await cartModel.findByIdAndDelete(cid);
  }
}
