import { Op } from "sequelize";
import { PAGINATION, SORT_OPTIONS } from "../../constants/requestResponseStatus.constant.js";
import db from "../../models/index.js";

const Category = db.Category;

export async function createCategoryService(payload) {
  const category = await Category.create(payload);
  return category;
}

export async function getAllCategoriesService(query) {
  const {
    page = 1,
    limit = PAGINATION.DEFAULT_LIMIT,
    search = "",
    sort,
  } = query;

  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  let order = [["createdAt", "ASC"]];

  if (sort === SORT_OPTIONS.NAME_DESC) {
    order = [["name", "DESC"]];
  }

  const { rows, count } = await Category.findAndCountAll({
    where,
    limit: Number(limit),
    offset: Number(offset),
    order,
  });

  return {
    data: rows,
    pagination: {
      totalRecords: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
      limit: Number(limit),
    },
  };
}


export async function updateCategoryService(categoryId, payload) {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  await category.update(payload);
  return category;
}

export async function deleteCategoryService(categoryId) {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  await category.destroy();
  return true;
}
