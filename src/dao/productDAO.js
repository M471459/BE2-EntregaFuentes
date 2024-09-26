import { productModel } from "./models/product.model.js";

export class productDAO {
  static async getAll(query, options) {
    const products = await productModel.paginate(query, options);
    return products;
  }

  static async getBy(filtro = {}) {
    const product = await productModel.findOne(filtro).lean();
    return product;
  }

  static async create(data) {
    console.log(data);
    const product = await productModel.create(data);
    return product;
  }

  static async update(id, data) {
    const product = await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return product;
  }

  static async deleteOne(filtro = {}) {
    const product = await productModel.findOneAndDelete(filtro).lean();
    return product;
  }
}
