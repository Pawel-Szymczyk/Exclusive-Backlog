import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {AppDispatch} from '../app/store';
import {CategoryStateType, StoreType} from '../features/category/CategoryStateType';
import {CategoryAction} from '../features/category/categorySlice';
import {ICategory} from '../features/category/Category';

const useCategoryViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    fetchingCategories,
    categories,

    creatingCategory,
    createCategorySuccess,
    createCategoryError,

    updatingCategory,
    updateCategorySuccess,
    updateCategoryError,

    deletingCategory,
    deleteCategorySuccess,
    deleteCategoryError,
  }: CategoryStateType = useSelector((state: StoreType) => state.category);

  const {createCategory, fetchCategories} = CategoryAction;

  // useEffect(() => {
  //   dispatch(fetchBacklogs());
  // // fetchBacklogs();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return {
    fetchingCategories,
    categories,
    fetchCategories: () => dispatch(fetchCategories()),

    createCategory: (newCategory: ICategory) => dispatch(createCategory(newCategory)),
    creatingCategory,
    createCategorySuccess,
    createCategoryError,

    // updateCategory: (payload: {_id: string; name: string; value: string}) =>
    //   dispatch(updateCategory(payload)),
    updatingCategory,
    updateCategorySuccess,
    updateCategoryError,

    // deleteCategory: (id: string) => dispatch(deleteCategory({id})),
    deletingCategory,
    deleteCategorySuccess,
    deleteCategoryError,
  };
};

export default useCategoryViewModel;
