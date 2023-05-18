import {useCallback, useEffect, useState} from 'react';
import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';

type BacklogFormState = {
  name: string;
  price: string;
  quantity: string;
  category: string;
  buyOn: string;
  //   buyOn: Date;
};

const initialBacklogFormState: BacklogFormState = {
  name: '',
  price: '0',
  quantity: '1',
  category: 'none',
  buyOn: '',
};

const useNewBacklogViewController = () => {
  //   var backlog: BacklogType;
  const [state, setState] = useState(initialBacklogFormState);
  const {createBacklog, creatingBacklog} = useBacklogViewModel();
  const {categories, fetchCategories, fetchingCategories} =
    useCategoryViewModel();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Perform any necessary actions when the state changes
    initialBacklogFormState.name = state.name;
    initialBacklogFormState.price = state.price;
    initialBacklogFormState.quantity = state.quantity;
    initialBacklogFormState.category = state.category;
    initialBacklogFormState.buyOn = state.buyOn;

    console.log(state);
  }, [state]); // Add state as a dependency

  const onFormSubmit = () => {
    console.log(initialBacklogFormState.name);

    createBacklog(
      initialBacklogFormState.name,
      initialBacklogFormState.category,
    );

    // e.preventDefault();
    // const {name} = state;
    // console.log(state.price);
    // console.log(name);
    // createBacklog(formState);
    // navigate
  };

  const onChangeText = (fieldName: keyof BacklogFormState, text: string) => {
    setState(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));

    // console.log(state.name);
  };

  return {
    categories,
    fetchingCategories,
    state,
    creatingBacklog,
    onChangeText,
    onFormSubmit,
  };
};

export default useNewBacklogViewController;
