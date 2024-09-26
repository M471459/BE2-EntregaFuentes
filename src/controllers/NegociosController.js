import { NegociosDAO } from "../dao/NegociosDAO.js";
import { procesaErrores } from "../utils.js";

export default class NegociosController {
  static getNegocios = async (req, res) => {
    try {
      // let negocios="Listado negocios"
      let negocios = await NegociosDAO.getNegocios();

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ negocios });
    } catch (error) {
      return procesaErrores(res, error);
    }
  };

  static createNegocio = async (req, res) => {
    let negocio = req.body;
    // validaciones x cuenta y orden del alumno...!!!

    try {
      // let nuevoNegocio="nuevo negocio generado: "+negocio.nombre
      let nuevoNegocio = await NegociosDAO.createNegocio(negocio);
      res.setHeader("Content-Type", "application/json");
      return res.status(201).json(nuevoNegocio);
    } catch (error) {
      return procesaErrores(res, error);
    }
  };
}
