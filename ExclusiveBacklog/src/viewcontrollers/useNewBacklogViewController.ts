import {useEffect, useState} from 'react';
import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';

type BacklogFormState = {
  name: string;
  price: number;
  quality: number;
  category: string;
  //   buyOn: Date;
};

const initialBacklogFormState: BacklogFormState = {
  name: '',
  price: 0,
  quality: 1,
  category: 'none',
  //   buyOn: new Date(),
};

const useNewBacklogViewController = () => {
  //   var backlog: BacklogType;
  const [formState, setFormState] = useState<BacklogFormState>(
    initialBacklogFormState,
  );
  const {createBacklog, creatingBacklog} = useBacklogViewModel();
  const {categories, fetchCategories, fetchingCategories} =
    useCategoryViewModel();

  useEffect(() => {
    fetchCategories();
  }, []);

  const onFormSubmit = () => {
    console.log(formState.name);
    // createBacklog(formState);
    // navigate
  };
  const onChangeText = (fieldName: keyof BacklogFormState, text: string) => {
    // console.log(text);
    setFormState(prevState => ({...prevState, [fieldName]: text}));
  };

  return {
    categories,
    fetchingCategories,
    formState,
    creatingBacklog,
    onChangeText,
    onFormSubmit,
  };
};

export default useNewBacklogViewController;
