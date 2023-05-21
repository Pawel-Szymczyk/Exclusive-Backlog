import {useCallback, useEffect, useState} from 'react';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';
import {IBacklog} from '../models/Backlog';
import {ICategory} from '../models/Category';

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
  const [backlogFormState, setBacklogFormState] = useState(initialBacklogFormState);
  const [categoryFormState, setCategoryFormState] = useState(initialCategoryFormState);

  const {createBacklog, creatingBacklog} = useBacklogViewModel();
  const {categories, fetchCategories, fetchingCategories} = useCategoryViewModel();

  useEffect(() => {
    fetchCategories();
  }, []);

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
      // id: '',
      // name: initialBacklogFormState.name,
      // category: initialBacklogFormState.category,
      // buyOn: initialBacklogFormState.buyOn,
      // price: Number(initialBacklogFormState.price),
      // quantity: Number(initialBacklogFormState.quantity),
      id: backlogFormState.id,
      name: backlogFormState.name,
      category: backlogFormState.category,
      buyOn: backlogFormState.buyOn,
      price: Number(backlogFormState.price),
      quantity: Number(backlogFormState.quantity),
    };

    createBacklog(newBacklog);

    // navigate
  };

  const onCategoryFormSubmit = (params: any) => {};

  // const onChangeText = (fieldName: keyof BacklogFormState, text: string) => {
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
    fetchingCategories,
    creatingBacklog,
    onChangeText,
    onChangeCategoryText,
    onFormSubmit,
    onCategoryFormSubmit,
  };
};

export default useNewBacklogViewController;
