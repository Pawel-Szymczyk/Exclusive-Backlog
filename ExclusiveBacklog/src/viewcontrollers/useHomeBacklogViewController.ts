import {useEffect} from 'react';
import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';

const useHomeBacklogViewController = () => {
  const {backlogs, fetchingBacklogs, createBacklog} = useBacklogViewModel();

  useEffect(() => {
    fetchBacklogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBacklogs = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.172:3000/exclusive-backlogs',
      );
      const data: BacklogType[] = await response.json();

      data.forEach(element => {
        createBacklog(element.name);
      });

      // const result: Response<BacklogResponse> = {
      //   status: response.status,
      // };

      // if (response.ok) {
      //   result.body = (await response.json()) as BacklogResponse;
      // }

      // return result;
    } catch (err) {}
  };

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
