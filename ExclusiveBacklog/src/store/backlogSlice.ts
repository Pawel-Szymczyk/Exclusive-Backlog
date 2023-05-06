import {createSlice, nanoid} from '@reduxjs/toolkit';
import {BacklogType} from '../types/BacklogType';
import BacklogStore from './backlogStore';

const initialState = BacklogStore;

export const backlogSlice = createSlice({
  name: 'backlog',
  initialState,
  reducers: {
    // getBacklogs: async ():Promise<void> => {
    //   try {
    //     const response = await fetch('localhost:3000/exclusive-backlogs');
    //     const json = await response.json();

    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

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
