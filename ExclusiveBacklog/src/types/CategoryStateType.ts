import {CategoryType} from './CategoryType';

export type CategoryStateType = {
  fetchingCategories: boolean;
  categories: Array<CategoryType>;

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
