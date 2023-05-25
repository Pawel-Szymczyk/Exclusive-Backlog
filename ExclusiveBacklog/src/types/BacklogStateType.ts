import {IBacklog} from '../models/Backlog';
// import {BacklogType} from './BacklogType';

export type BacklogStateType = {
  fetchingBacklogs: boolean;
  // backlogs: Array<BacklogType>;
  backlogs: Array<IBacklog>;

  fetchingBacklogById: boolean;
  fetchingBacklogByIdSuccess: boolean;
  fetchingBacklogByIdBacklogError: boolean;
  backlogById: IBacklog | null;

  creatingBacklog: boolean;
  createBacklogSuccess: boolean;
  createBacklogError: boolean;

  updatingBacklog: boolean;
  updateBacklogSuccess: boolean;
  updateBacklogError: boolean;

  deletingBacklog: boolean;
  deleteBacklogSuccess: boolean;
  deleteBacklogError: boolean;
};

export type StoreType = {
  backlog: BacklogStateType;
};
