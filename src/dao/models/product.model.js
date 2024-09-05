import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "product"; //Nombre de la colección

//Modelo de Schema

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    dafault: [],
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: Array,
    default: "",
  },
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);
