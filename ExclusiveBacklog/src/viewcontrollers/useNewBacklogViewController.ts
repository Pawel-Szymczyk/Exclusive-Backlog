import {useCallback, useEffect, useState} from 'react';
// import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';
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

const initialBacklogFormState: IBacklog = {
  id: '',
  name: '',
  price: 0,
  quantity: 1,
  category: 'none',
  buyOn: '',
};

const initialCategoryFormState: ICategory = {
  id: '',
  name: '',
  value: '',
};

const useNewBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'NewBacklog', undefined> =
    useNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const {status, error}: BacklogStateType = useSelector((state: StoreType) => state.backlog);
  const {categoryStatus, categories, categoryError}: CategoryStateType = useSelector(
    (state: CategoryStoreType) => state.category,
  );

  const [backlogFormState, setBacklogFormState] = useState(initialBacklogFormState);
  const [categoryFormState, setCategoryFormState] = useState(initialCategoryFormState);

  const {createBacklog, resetStatus} = BacklogAction;
  const {createCategory, fetchCategories, resetCategoryStatus} = CategoryAction;

  // const {createBacklog, creatingBacklog} = useBacklogViewModel();
  // const {createCategory, categories, fetchCategories, fetchingCategories, createCategorySuccess} =
  //   useCategoryViewModel();

  useEffect(() => {
    if (categoryStatus === Status.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  useEffect(() => {
    // Perform any necessary actions when the state changes
    initialBacklogFormState.name = backlogFormState.name;
    initialBacklogFormState.price = backlogFormState.price;
    initialBacklogFormState.quantity = backlogFormState.quantity;
    initialBacklogFormState.category = backlogFormState.category;
    initialBacklogFormState.buyOn = backlogFormState.buyOn;
    // console.log(state);
  }, [backlogFormState]); // Add state as a dependency

  useEffect(() => {
    initialCategoryFormState.name = categoryFormState.name;
    initialCategoryFormState.value = categoryFormState.value;
  }, [categoryFormState]);

  const onFormSubmit = (params: any) => {
    console.log(backlogFormState.name);

    const newBacklog: IBacklog = {
      id: backlogFormState.id,
      name: backlogFormState.name,
      category: backlogFormState.category,
      buyOn: backlogFormState.buyOn,
      price: Number(backlogFormState.price),
      quantity: Number(backlogFormState.quantity),
    };

    dispatch(createBacklog(newBacklog));
    dispatch(resetStatus());
    // createBacklog(newBacklog);

    // navigate back
    navigation.goBack();
  };

  const onCategoryFormSubmit = (params: any) => {
    const newCategory: ICategory = {
      id: categoryFormState.id,
      name: categoryFormState.name,
      value: categoryFormState.value,
    };

    dispatch(createCategory(newCategory));
  };

  const onChangeText = (fieldName: keyof IBacklog, text: string) => {
    setBacklogFormState(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const onChangeCategoryText = (fieldName: keyof ICategory, text: string) => {
    setCategoryFormState(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  return {
    backlogFormState,
    categoryFormState,
    categories,
    onChangeText,
    onChangeCategoryText,
    onFormSubmit,
    onCategoryFormSubmit,
  };
};

export default useNewBacklogViewController;
