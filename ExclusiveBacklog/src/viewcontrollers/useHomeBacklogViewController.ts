import {useEffect} from 'react';
import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';

const useHomeBacklogViewController = () => {
  const {backlogs, fetchingBacklogs} = useBacklogViewModel();

  useEffect(() => {
    // fetchingBacklogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressBacklogItem = (backlog: BacklogType) => {
    // navigation.navigate(screenMap.UpdateTodo, {todoItem});
  };

  const onPressCreate = () => {
    // navigation.navigate(screenMap.NewTodo);
  };

  return {
    backlogs,
    fetchingBacklogs,
    onPressBacklogItem,
    onPressCreate,
  };
};

export default useHomeBacklogViewController;
