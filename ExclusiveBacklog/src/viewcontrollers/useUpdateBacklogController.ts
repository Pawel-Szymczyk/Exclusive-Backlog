import {useEffect, useState} from 'react';
import {IBacklog} from '../features/backlog/Backlog';
import {ICategory} from '../features/category/Category';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../app/store';
import {BacklogStateType, StoreType} from '../features/backlog/BacklogStateType';
import {CategoryStateType, CategoryStoreType} from '../features/category/CategoryStateType';
import {BacklogAction, fetchBacklogById} from '../features/backlog/backlogSlice';
import {CategoryAction} from '../features/category/categorySlice';
import {Status} from '../types/Status';

const useUpdateBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'UpdateBacklog', undefined> =
    useNavigation();
  const route = useRoute();

  const dispatch = useDispatch<AppDispatch>();
  const {status, error, backlog}: BacklogStateType = useSelector(
    (state: StoreType) => state.backlog,
  );
  const {categoryStatus, categories, categoryError}: CategoryStateType = useSelector(
    (state: CategoryStoreType) => state.category,
  );

  const {updateBacklog, resetStatus} = BacklogAction;
  const {createCategory, fetchCategories, resetCategoryStatus} = CategoryAction;

  useEffect(() => {
    const {id} = route.params as RootStackParamList['UpdateBacklog'];
    if (id !== undefined) {
      if (status === Status.IDLE) {
        dispatch(fetchBacklogById(id));
      }
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (categoryStatus === Status.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const onFormSubmit = (backlog: IBacklog) => {
    try {
      if (backlog.category !== undefined) {
        dispatch(updateBacklog(backlog));
        dispatch(resetStatus());
        // navigate back
        navigation.goBack();
      } else {
        // return error msg
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const onCategoryFormSubmit = (category: ICategory) => {
    //   category.value = category.name;
    //   dispatch(createCategory(category));
    //   dispatch(resetCategoryStatus());
  };

  return {
    backlog,
    categories,
    onFormSubmit,
    onCategoryFormSubmit,
  };
};

export default useUpdateBacklogViewController;
