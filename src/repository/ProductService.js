import { productDAO as DAO } from "../dao/productDAO.js";

class ProductsService {
  constructor(dao) {
    this.ProductsDAO = dao;
  }

  async getProducts(limit, page, sort, category, status) {
    try {
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
      };

      if (status) {
        const products = await DAO.getAll({ status }, options);
        return products;
        //return res.status(200).json({ status: "OK", products });
      }

      if (category) {
        const products = await DAO.getAll({ category }, options);
        return products;
        //return res.status(200).json({ status: "OK", products });
      }
      const products = await DAO.getAll({}, options);
      return products;
      //res.status(200).json({ status: "OK", products });
    } catch (error) {
      console.log(error);
      /*res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });*/
    }
  }

  async getProductBy(id) {
    try {
      const productFound = await DAO.getBy({
        _id: id,
      });
      /*if (!productFound)
        return res.status(404).json({
          status: "error",
          msg: `No existe el servicio con el id ${id}`,
        });*/
      return productFound;
      //res.status(200).json({ status: "ok", productFound });
    } catch (error) {
      console.log(error);
      return error;
      /*res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });*/
    }
  }

  async createProduct(body) {
    try {
      const product = await DAO.create(body);
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, body) {
    try {
      const product = await DAO.update(id, body);
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteProduct(id) {
    try {
      const product = await DAO.deleteOne({ _id: id });
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const productsService = new ProductsService(new DAO());
