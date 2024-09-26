import ProductRouter from "./ProductRouter.js";
import CartRouter from "./CartRouter.js";
import sessionsRouter from "./sessionsRouter.js";
import { NegociosRouter } from "./negociosRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", ProductRouter);
router.use("/carts", CartRouter);
router.use("/sessions", sessionsRouter);
router.use("/negocios", NegociosRouter);

export default router;
