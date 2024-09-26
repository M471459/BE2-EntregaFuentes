import { Router } from 'express';
import OrdensController from '../controller/OrdenesController.js';
export const router=Router()

router.get('/', OrdensController.getOrdenes)
router.post('/', OrdensController.createOrden)