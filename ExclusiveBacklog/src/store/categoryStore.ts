import {nanoid} from '@reduxjs/toolkit';
import {CategoryStateType} from '../types/CategoryStateType';

const CategoryStore: CategoryStateType = {
  fetchingCategories: false,
  categories: [],
  creatingCategory: false,
  createCategorySuccess: false,
  createCategoryError: false,

  updatingCategory: false,
  updateCategorySuccess: false,
  updateCategoryError: false,

  deletingCategory: false,
  deleteCategorySuccess: false,
  deleteCategoryError: false,
};

export default CategoryStore;
