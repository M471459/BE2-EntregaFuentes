import { usuariosModelo } from "./models/usuariosModel.js";

export class UsuariosDAO {
  static async getBy(filtro = {}) {
    return await usuariosModelo.findOne(filtro).lean();
  }

  static async create(usuario) {
    return (await usuariosModelo.create(usuario)).toJSON();
  }
}
