import { cartDAO } from "../dao/cartDAO.js";

export class datosUsuario {
  constructor(usuario) {
    this.first_name = usuario.first_name;
    this.last_name = usuario.last_name;
    this.full_name = `${usuario.first_name} ${usuario.last_name}`;
    this.email = usuario.email;
    this.age = usuario.age;
    this.role = usuario.role;
  }
}
