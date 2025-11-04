import { Router } from "express";
import {
  bulkUploadProductsController,
  createProductController,
  deleteProductController,
  exportProductsReport,
  getProductController,
  productListController,
  updateProductController
} from "../../controllers/v1/product/product.controller.js";

import { authorizeUser } from "../../middlewares/auth.middleware.js";
import Joi from "joi";
import { validate } from "../../middlewares/validators.middleware.js";
import uploadMiddleware from "../../middlewares/upload.middleware.js";

export const productSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Product name must be a string",
      "string.empty": "Product name is required",
      "any.required": "Product name is required",
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be a positive value",
      "any.required": "Price is required",
    }),

  image: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Image must be a string",
    }),

  categoryId: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.base": "Category ID must be a string",
      "string.guid": "Category ID must be a valid UUID",
      "any.required": "Category ID is required",
    }),
});

const router = Router();

router.post("/", authorizeUser, validate(productSchema),createProductController);
router.get("/", authorizeUser, productListController);
router.get("/:id", authorizeUser, getProductController);
router.put("/:id", authorizeUser,validate(productSchema), updateProductController);
router.delete("/:id", authorizeUser, deleteProductController);

router.post("/bulk-upload",authorizeUser, uploadMiddleware, bulkUploadProductsController);

router.get("/document/export-products", exportProductsReport);


export default router;
