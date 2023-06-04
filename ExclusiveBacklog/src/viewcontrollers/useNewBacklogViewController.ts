import {useEffect, useState} from 'react';
import {IBacklog} from '../features/backlog/Backlog';
import {ICategory} from '../features/category/Category';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../app/store';
import {BacklogStateType, StoreType} from '../features/backlog/BacklogStateType';
import {CategoryStateType, CategoryStoreType} from '../features/category/CategoryStateType';
import {BacklogAction} from '../features/backlog/backlogSlice';
import {CategoryAction} from '../features/category/categorySlice';
import {Status} from '../types/Status';

const useNewBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'NewBacklog', undefined> =
    useNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const {status, error}: BacklogStateType = useSelector((state: StoreType) => state.backlog);
  const {categoryStatus, categories, categoryError}: CategoryStateType = useSelector(
    (state: CategoryStoreType) => state.category,
  );

  const {createBacklog, resetStatus} = BacklogAction;
  const {createCategory, fetchCategories, resetCategoryStatus} = CategoryAction;

  useEffect(() => {
    if (categoryStatus === Status.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const onFormSubmit = (backlog: IBacklog) => {
    if (backlog.category !== undefined) {
      dispatch(createBacklog(backlog));
      dispatch(resetStatus());

      // navigate back
      navigation.goBack();
    } else {
      // return error msg
    }
  };

  const onCategoryFormSubmit = (category: ICategory) => {
    category.value = category.name;

    dispatch(createCategory(category));
    dispatch(resetCategoryStatus());
  };

  return {
    categories,
    onFormSubmit,
    onCategoryFormSubmit,
  };
};

export default useNewBacklogViewController;
