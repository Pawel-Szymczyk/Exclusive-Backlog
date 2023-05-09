import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import {BacklogType} from '../types/BacklogType';
import BacklogStore from './backlogStore';
import exclusiveBacklogService from '../services/exclusiveBacklogService';

const initialState = BacklogStore;
const backlogService = new exclusiveBacklogService();

export const fetchBacklogs = createAsyncThunk(
  'backlog/fetchBacklogs',
  async () => {
    // return fetch('http://192.168.1.172:3000/exclusive-backlogs').then(res =>
    //   res.json(),
    // );
    return backlogService.getAllBacklogs();
  },
);

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
  extraReducers(builder) {
    builder.addCase(fetchBacklogs.pending, state => {
      state.fetchingBacklogs = true;
    });
    builder.addCase(fetchBacklogs.fulfilled, (state, action) => {
      state.backlogs = action.payload;
      state.fetchingBacklogs = false;
    });
    builder.addCase(fetchBacklogs.rejected, state => {
      state.backlogs = [];
      state.fetchingBacklogs = false;
    });
  },
});

const {createBacklog, updateBacklog, deleteBacklog} = backlogSlice.actions;

export const BacklogAction = {
  fetchBacklogs,
  createBacklog,
  updateBacklog,
  deleteBacklog,
};

export default backlogSlice.reducer;
