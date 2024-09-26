import mongoose from "mongoose";

function generateCode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase(); // Genera un código aleatorio único
}

export const ticketModelo = mongoose.model(
  "ticket",
  new mongoose.Schema(
    {
      code: { type: String, unique: true, default: generateCode },
      purchase_datetime: { type: Date, default: () => new Date() },
      amount: Number,
      purchaser: String,
      /*usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
      },*/
      detalle: {
        type: [
          {
            id: Number,
            descrip: String,
            cantidad: Number,
            precio: Number,
            subtotal: Number,
          },
        ],
      },
    },
    {
      timestamps: { createdAt: "purchase_datetime" },
    }
  )
);
