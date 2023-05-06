import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, StoreType} from '../types/BacklogStateType';
import {BacklogAction} from '../store/backlogSlice';

const useBacklogViewModel = () => {
  const dispatch = useDispatch();
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

  const {createBacklog, updateBacklog, deleteBacklog} = BacklogAction;

  return {
    fetchingBacklogs,
    backlogs,

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
