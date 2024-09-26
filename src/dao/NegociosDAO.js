import { negociosModelo } from "./models/negociosModelo.js";

export class NegociosDAO{
    static async getNegocios(){
        return await negociosModelo.find().lean()
    }
    static async getNegocioBy(filtro={}){
        return await negociosModelo.findOne(filtro).lean()
    }
    static async createNegocio(negocio){
        return await negociosModelo.create(negocio)
    }
}