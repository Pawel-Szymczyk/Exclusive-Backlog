import {createSlice, nanoid} from '@reduxjs/toolkit';
import {BacklogType} from '../types/BacklogType';
import BacklogStore from './backlogStore';

const initialState = BacklogStore;

export const backlogSlice = createSlice({
  name: 'backlog',
  initialState,
  reducers: {
    createBacklog: (state, action: {payload: {name: string}; type: string}) => {
      state.backlogs = state.backlogs.concat([
        {name: action.payload.name, id: nanoid()},
      ]);
    },
    updateBacklog: (state, action: {payload: BacklogType; type: string}) => {
      state.backlogs = state.backlogs.map((backlogItem: BacklogType) => {
        if (backlogItem.id === action.payload.id) {
          backlogItem.name = action.payload.name;
          return backlogItem;
        }
        return backlogItem;
      });
      state.backlogs.concat([action.payload]);
    },
    deleteBacklog: (state, action: {payload: {id: string}; type: string}) => {
      state.backlogs = state.backlogs.filter(
        (backlogItem: BacklogType) => backlogItem.id !== action.payload.id,
      );
    },
  },
});

const {createBacklog, updateBacklog, deleteBacklog} = backlogSlice.actions;

export const BacklogAction = {
  createBacklog,
  updateBacklog,
  deleteBacklog,
};

export default backlogSlice.reducer;
