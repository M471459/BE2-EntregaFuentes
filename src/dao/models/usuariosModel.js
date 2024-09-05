import mongoose from "mongoose";

export const usuariosModelo = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      first_name: { type: String },
      last_name: { type: String },
      email: { type: String, unique: true },
      age: { type: Number },
      password: { type: String, required: true },
      cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
      role: { type: String, default: "user" },
    },
    {
      timestamps: true,
    }
  )
);
