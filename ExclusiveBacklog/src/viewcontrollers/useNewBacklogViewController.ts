import {useCallback, useEffect, useState} from 'react';
// import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';
import {IBacklog} from '../models/Backlog';
// import {Backlog} from '../models/Backlog';

interface BacklogFormState {
  name: string;
  price: string;
  quantity: string;
  category: string;
  buyOn: string;
}

const initialBacklogFormState: BacklogFormState = {
  name: '',
  price: '0',
  quantity: '1',
  category: 'none',
  buyOn: '',
};

const useNewBacklogViewController = () => {
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

  const onFormSubmit = (params: any) => {
    console.log(initialBacklogFormState.name);

    const newBacklog: IBacklog = {
      id: '',
      name: initialBacklogFormState.name,
      category: initialBacklogFormState.category,
      buyOn: initialBacklogFormState.buyOn,
      price: Number(initialBacklogFormState.price),
      quantity: Number(initialBacklogFormState.quantity),
    };

    createBacklog(newBacklog);

    // navigate
  };

  const onChangeText = (fieldName: keyof BacklogFormState, text: string) => {
    setState(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
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
