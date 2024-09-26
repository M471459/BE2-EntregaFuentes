export class UsuariosDTO {
  constructor(usuario) {
    this.full_name = `${usuario.first_name} ${usuario.last_name}`;
  }
}
