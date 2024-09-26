import { usuariosModelo } from "./models/usuariosModel.js";

export class UsuariosDAO {
  constructor() {}
  static async getAll() {
    return await usuariosModelo.find().lean().populate();
  }
  static async getBy(filtro = {}) {
    return await usuariosModelo.findOne(filtro).lean();
  }
  static async create(usuario) {
    return (await usuariosModelo.create(usuario)).toJSON();
  }
  static async updateUsuario(uid, usuario) {
    await usuariosModelo.findByIdAndUpdate(
      uid,
      { $set: { pedidos: usuario.pedidos } },
      { new: true }
    );
  }
}
