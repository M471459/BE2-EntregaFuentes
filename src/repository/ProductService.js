import { productDAO as DAO } from "../dao/productDAO.js";
import { productDTO } from "../dto/usuariosDTO.js";

class ProductService {
  constructor(dao) {
    this.heroesDAO = dao;
  }

  async getAll() {
    let heroes = await this.heroesDAO.get();
    heroes = heroes.map((heroe) => new HeroesDTO(heroe));
    return heroes;
  }

  async getHeroeByName(name) {
    let heroes = await this.heroesDAO.get();
    let heroe = heroes.find((h) => h.name.toLowerCase() === name.toLowerCase());
    return new HeroesDTO(heroe);
  }
}

export const heroesService = new ProductService(new DAO());
