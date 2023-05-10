import {nanoid} from '@reduxjs/toolkit';
import {BacklogStateType} from '../types/BacklogStateType';

const BacklogStore: BacklogStateType = {
  fetchingBacklogs: false,
  backlogs: [
    // {
    //   _id: nanoid(),
    //   name: 'test 1',
    //   category: 'test 1',
    // },
    // {
    //   _id: nanoid(),
    //   name: 'test 2',
    //   category: 'test 2',
    // },
  ],
  creatingBacklog: false,
  createBacklogSuccess: false,
  createBacklogError: false,

  updatingBacklog: false,
  updateBacklogSuccess: false,
  updateBacklogError: false,

  deletingBacklog: false,
  deleteBacklogSuccess: false,
  deleteBacklogError: false,
};

export default BacklogStore;
