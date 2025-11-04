import { STATUS_CODE, STATUS_MESSAGE } from "../../../constants/requestResponseStatus.constant.js";
import { 
  getProductService,
  createProductService,
  deleteProductService,
  productListService,
  updateProductService 
} from "../../../services/v1/product.service.js";

export async function createProductController(request, response, next) {
  try {
    const product = await createProductService(request.body);

    return response.status(STATUS_CODE.CREATED).json({
      success: true,
      message: STATUS_MESSAGE.CREATED,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProductController(request, response, next) {
  try {
    const productId = request.params.id;

    const updated = await updateProductService(productId, request.body);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.UPDATED,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProductController(request, response, next) {
  try {
    const productId = request.params.id;

    await deleteProductService(productId);

    return response.status(STATUS_CODE.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
}

export async function productListController(request, response, next) {
  try {
    const result = await productListService(request.query);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export const getProductController = async (_request, response,next) => {
  try {
    const id = req.params.id;

    const product = await getProductService(id);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.SUCCESS,
      data: product,
    });

  } catch (error) {
    next(error);
  }
};