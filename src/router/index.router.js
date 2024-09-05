import ProductRouter from "./ProductRouter.js";
import CartRouter from "./CartRouter.js";
import sessionsRouter from "./sessionsRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", ProductRouter);
router.use("/carts", CartRouter);
router.use("/sessions", sessionsRouter);

export default router;
