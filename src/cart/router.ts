import express from "express";
import { addToCartController, getCartController, removeToCartController } from "./controller/CartController.ts";
import ValidateAdminUserMiddleware from "../middleware/ValidateAdminUserMiddleware.ts";

const router = express.Router();

router.post('/', ValidateAdminUserMiddleware, addToCartController);
router.delete('/', ValidateAdminUserMiddleware, removeToCartController);
router.get('/', ValidateAdminUserMiddleware, getCartController);

export default router;