import { Parser } from "json2csv";
import db from "../../models/index.js";
import {
  STATUS_CODE,
  STATUS_MESSAGE,
  PAGINATION,
  SORT_OPTIONS,
} from "../../constants/requestResponseStatus.constant.js";
import { Op } from "sequelize";
import { productBulkQueue } from "../../queues/product.queue.js";

const Product = db.Product;
const Category = db.Category;

export async function createProductService(payload) {
  return Product.create(payload);
}

export async function updateProductService(productId, payload) {
  const product = await Product.findByPk(productId);

  if (!product) {
    const error = new Error(STATUS_MESSAGE.PRODUCT_NOT_FOUND);
    error.statusCode = STATUS_CODE.NOT_FOUND;
    throw error;
  }

  await product.update(payload, {
    fields: Object.keys(payload)
  });
  return product;
}

export async function deleteProductService(productId) {
  const product = await Product.findByPk(productId);

  if (!product) {
    const error = new Error(STATUS_MESSAGE.PRODUCT_NOT_FOUND);
    error.statusCode = STATUS_CODE.NOT_FOUND;
    throw error;
  }

  await product.destroy();
  return true;
}

export async function productListService(query) {
  let {
    page = 1,
    limit = PAGINATION.DEFAULT_LIMIT,
    search,
    category,
    sort,
  } = query;

  page = parseInt(page);
  limit = parseInt(limit);

  const offset = (page - 1) * limit;

  const where = {};

  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  if (category) {
    where.categoryId = category;
  }

  let order = [];

  if (sort === SORT_OPTIONS.PRICE_ASC) order = [["price", "ASC"]];
  else if (sort === SORT_OPTIONS.PRICE_DESC) order = [["price", "DESC"]];

  const { count, rows } = await Product.findAndCountAll({
    where,
    include: [{ 
      model: Category, 
      as: "category",
      attributes: ["id", "name"] 
    }],
    limit,
    offset,
    order,
  });

  return {
    data: rows,
    pagination: {
      totalRecords: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
      limit: Number(limit),
    }
  };
}

export const getProductService = async (productId) => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error(STATUS_MESSAGE.PRODUCT_NOT_FOUND);
  }

  return product;
};

export const bulkUploadProductService = async (filePath) => {
  const job = await productBulkQueue.add("bulk-upload", { filePath });
  return job.id;
};

export const exportProductsService = async () => {
  const products = await Product.findAll({
    include: [{ model: Category, as: 'category', attributes: ["name"] }],
    raw: true,
  });

  const fields = [
    "id",
    "name",
    "image",
    "price",
    "category.name",
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(products);

  return { csv };
};