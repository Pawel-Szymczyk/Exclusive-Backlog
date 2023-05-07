import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, StoreType} from '../types/BacklogStateType';
import {BacklogAction, fetchBacklogs} from '../store/backlogSlice';
import {useEffect} from 'react';
import {AppDispatch} from '../store';

const useBacklogViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    fetchingBacklogs,
    backlogs,

    creatingBacklog,
    createBacklogSuccess,
    createBacklogError,

    updatingBacklog,
    updateBacklogSuccess,
    updateBacklogError,

    deletingBacklog,
    deleteBacklogSuccess,
    deleteBacklogError,
  }: BacklogStateType = useSelector((state: StoreType) => state.backlog);

  const {createBacklog, updateBacklog, deleteBacklog, fetchBacklogs} =
    BacklogAction;

  // useEffect(() => {
  //   dispatch(fetchBacklogs());
  // // fetchBacklogs();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return {
    fetchingBacklogs,
    backlogs,
    fetchBacklogs: () => dispatch(fetchBacklogs()),

    createBacklog: (name: string) => dispatch(createBacklog({name})),
    creatingBacklog,
    createBacklogSuccess,
    createBacklogError,

    updateBacklog: (payload: {id: string; name: string}) =>
      dispatch(updateBacklog(payload)),
    updatingBacklog,
    updateBacklogSuccess,
    updateBacklogError,

    deleteBacklog: (id: string) => dispatch(deleteBacklog({id})),
    deletingBacklog,
    deleteBacklogSuccess,
    deleteBacklogError,
  };
};

export default useBacklogViewModel;
