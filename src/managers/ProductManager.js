import fs from "fs";

const path = "./src/managers/data/products.json";
import { v4 as uuid } from "uuid";

let products = [];

const addProduct = async (product) => {
  try {
    await getProducts();
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = product;
    const newProduct = {
      id: uuid(),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail,
    };

    products.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(products));
    console.log("Producto agregado con éxito");
    return newProduct;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getProducts = async (limit) => {
  try {
    const fileJSON = await fs.promises.readFile(path, "utf-8");
    const parseFile = JSON.parse(fileJSON);
    if (limit === undefined) {
      products = parseFile || [];
    } else products = (parseFile || []).slice(0, Number(limit));
    return products;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getProductsbyId = async (id) => {
  try {
    await getProducts();
    const product = products.find((s) => s.id === id);
    return product;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateProduct = async (id, productData) => {
  try {
    await getProducts();
    const index = products.findIndex((i) => i.id === id);
    products[index] = {
      ...products[index],
      ...productData,
    };
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products[index];
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteProduct = async (id) => {
  try {
    await getProducts();
    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(`${error}`);
  }
};

export default {
  addProduct,
  getProducts,
  getProductsbyId,
  updateProduct,
  deleteProduct,
};
