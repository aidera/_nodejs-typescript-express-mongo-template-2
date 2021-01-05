import express from "express";

import ProductsController from "../controllers/shop.controller";
import ShopValidator from "../services/validation/shop.validator";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.get("/", ProductsController.getProducts);
router.get("/all", ProductsController.getAllProducts);
router.get("/:productId", ProductsController.getProduct);
router.put("/", isAuth, ShopValidator.addProduct, ProductsController.addProduct);
router.patch("/:productId", isAuth, ShopValidator.editProduct, ProductsController.editProduct);
router.delete("/:productId", isAuth, ProductsController.removeProduct);

export default router;
