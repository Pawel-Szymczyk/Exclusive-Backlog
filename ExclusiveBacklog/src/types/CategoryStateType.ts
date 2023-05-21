// import {CategoryType} from './CategoryType';

import {ICategory} from '../models/Category';

export type CategoryStateType = {
  fetchingCategories: boolean;
  categories: Array<ICategory>;

  creatingCategory: boolean;
  createCategorySuccess: boolean;
  createCategoryError: boolean;

  updatingCategory: boolean;
  updateCategorySuccess: boolean;
  updateCategoryError: boolean;

  deletingCategory: boolean;
  deleteCategorySuccess: boolean;
  deleteCategoryError: boolean;
};

export type StoreType = {
  category: CategoryStateType;
};
