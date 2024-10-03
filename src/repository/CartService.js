import { cartDAO as DAO } from "../dao/cartDAO.js";

class CartService {
  constructor(dao) {
    this.ProductsDAO = dao;
  }

  async getCartsAll() {
    try {
      const carts = await DAO.getAll();
      return carts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCartBy(id) {
    try {
      //const { id } = req.params;
      const cartFound = await DAO.getBy({ _id: id });
      if (!cartFound) return;
      return cartFound;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createCart(body) {
    try {
      //const body = req.body;
      const cart = await DAO.create(body);
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await DAO.addProductToCart(cid, pid);
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const cart = await DAO.update(id, body);
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const cart = await DAO.deleteOne({ _id: id });
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteAllProductsinCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartBy({ _id: cid });
      if (!cart) return;
      const cartResponse = await DAO.deleteAllProductsInCart(cid);
      return cartResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteProductInCart(cid, pid) {
    try {
      const cart = await DAO.deleteProductInCart(cid, pid);
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const cartService = new CartService(new DAO());
