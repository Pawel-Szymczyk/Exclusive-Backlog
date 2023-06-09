// import {useDispatch, useSelector} from 'react-redux';
// import {BacklogStateType, StoreType} from '../types/BacklogStateType';
// import {BacklogAction, fetchBacklogs} from '../store/backlogSlice';
// import {useEffect} from 'react';
// import {AppDispatch} from '../store/store';
// import {IBacklog} from '../models/Backlog';
// // import {Backlog} from '../models/Backlog';

// const useBacklogViewModel = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const {
//     fetchingBacklogs,
//     backlogs,

//     fetchingBacklogById,
//     fetchingBacklogByIdSuccess,
//     fetchingBacklogByIdBacklogError,
//     backlogById,

//     creatingBacklog,
//     createBacklogSuccess,
//     createBacklogError,

//     updatingBacklog,
//     updateBacklogSuccess,
//     updateBacklogError,

//     deletingBacklog,
//     deleteBacklogSuccess,
//     deleteBacklogError,
//   }: BacklogStateType = useSelector((state: StoreType) => state.backlog);

//   const {createBacklog, updateBacklog, deleteBacklog, fetchBacklogs, fetchBacklogById} =
//     BacklogAction;

//   // useEffect(() => {
//   //   dispatch(fetchBacklogs());
//   // // fetchBacklogs();
//   // // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [dispatch]);

//   return {
//     fetchingBacklogs,
//     backlogs,
//     fetchBacklogs: () => dispatch(fetchBacklogs()),

//     backlogById,
//     fetchingBacklogById,
//     fetchingBacklogByIdSuccess,
//     fetchingBacklogByIdBacklogError,
//     fetchBacklogById: (id: string) => dispatch(fetchBacklogById(id)),

//     createBacklog: (newBacklog: IBacklog) => dispatch(createBacklog(newBacklog)),
//     creatingBacklog,
//     createBacklogSuccess,
//     createBacklogError,

//     // updateBacklog: (payload: {_id: string; name: string; category: string}) =>
//     //   dispatch(updateBacklog(payload)),
//     updatingBacklog,
//     updateBacklogSuccess,
//     updateBacklogError,

//     deleteBacklog: (id: string) => dispatch(deleteBacklog({id})),
//     deletingBacklog,
//     deleteBacklogSuccess,
//     deleteBacklogError,
//   };
// };

// export default useBacklogViewModel;
