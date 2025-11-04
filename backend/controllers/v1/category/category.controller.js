import {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "../../../services/v1/category.service.js";
import { STATUS_CODE, STATUS_MESSAGE } from "../../../constants/requestResponseStatus.constant.js";

export async function createCategoryController(request, response, next) {
  try {
    const category = await createCategoryService(request.body);

    return response.status(STATUS_CODE.CREATED).json({
      success: true,
      message: STATUS_MESSAGE.CREATED,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategoriesController(request, response, next) {
  try {
    const result = await getAllCategoriesService(request.query);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.SUCCESS,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}


export async function updateCategoryController(request, response, next) {
  try {
    const categoryId = request.params.id;

    const updated = await updateCategoryService(categoryId, request.body);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.UPDATED,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategoryController(request, response, next) {
  try {
    const categoryId = request.params.id;

    await deleteCategoryService(categoryId);

    return response.status(STATUS_CODE.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
}
