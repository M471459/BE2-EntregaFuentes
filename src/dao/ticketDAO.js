import { ticketModelo } from "./models/ticketModelo.js";

export class ticketDAO {
  static async getOrdenes() {
    return await ticketModelo
      .find()
      .populate("negocio")
      .populate("usuario")
      .lean();
  }
  static async create(orden) {
    return await ticketModelo.create(orden);
  }
}
