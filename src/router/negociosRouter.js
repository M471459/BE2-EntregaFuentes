import { Router } from "express";
import NegociosController from "../controllers/NegociosController.js";
export const NegociosRouter = Router();

NegociosRouter.get("/", NegociosController.getNegocios);
NegociosRouter.post("/", NegociosController.createNegocio);
