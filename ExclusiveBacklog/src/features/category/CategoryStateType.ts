import {Status} from '../../types/Status';
import {ICategory} from './Category';

export type CategoryStateType = {
  categoryStatus: Status;
  categoryError: String | null;
  categories: Array<ICategory>;

  // fetchingCategories: boolean;

  // creatingCategory: boolean;
  // createCategorySuccess: boolean;
  // createCategoryError: boolean;

  // updatingCategory: boolean;
  // updateCategorySuccess: boolean;
  // updateCategoryError: boolean;

  // deletingCategory: boolean;
  // deleteCategorySuccess: boolean;
  // deleteCategoryError: boolean;
};

export type CategoryStoreType = {
  category: CategoryStateType;
};
