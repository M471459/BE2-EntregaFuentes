import { productModel } from "./models/product.model.js";

const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);

  /*let query = productModel.find();
  if (isNaN(limit)) {
    limit = 10;
  }
  if (isNaN(page)) {
    page = 1;
  }
  if (sort === "asc" || sort === "desc") {
    query = query.sort({ price: sort });
  }

  query = query.skip((page - 1) * limit).limit(limit);
  const products = await query;

   const totalProducts = await productModel.find();
  const totalPages = Math.ceil(totalProducts / limit);*/
  return products;
};

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};
const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

const update = async (id, data) => {
  const product = await productModel.findByIdAndUpdate(id, data, { new: true });
  return product;
};

const deleteOne = async (id) => {
  const product = await productModel.findByIdAndDelete(id);
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
