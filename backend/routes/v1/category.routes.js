import { Router } from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
} from "../../controllers/v1/category/category.controller.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import Joi from "joi";
import { validate } from "../../middlewares/validators.middleware.js";

const router = Router();

export const CategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
});

router.post("/", authorizeUser, validate(CategorySchema), createCategoryController);
router.get("/", authorizeUser, getAllCategoriesController);
router.put("/:id", authorizeUser,validate(CategorySchema), updateCategoryController);
router.delete("/:id", authorizeUser, deleteCategoryController);

export default router;
