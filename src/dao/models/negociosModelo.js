import mongoose from "mongoose";

export const negociosModelo = mongoose.model(
  "negocios",
  new mongoose.Schema(
    {
      nombre: { type: String, unique: true },
      productos: {
        type: [
          {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            quantity: Number,
            /*id: Number,
            descrip: String,
            precio: Number,*/
          },
        ],
      },
    },
    { timestamps: true }
  )
);
