import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
// import {BacklogType} from '../types/BacklogType';
import exclusiveBacklogService from '../services/exclusiveBacklogService';
// import {Backlog} from '../models/Backlog';
import {BacklogStateType} from '../types/BacklogStateType';
import {IBacklog} from '../models/Backlog';

const backlogService = new exclusiveBacklogService();

const initialState: BacklogStateType = {
  fetchingBacklogs: false,
  backlogs: [
    // {
    //   _id: nanoid(),
    //   name: 'test 1',
    //   category: 'test 1',
    // },
  ],

  fetchingBacklogById: false,
  fetchingBacklogByIdSuccess: false,
  fetchingBacklogByIdBacklogError: false,
  backlogById: {id: '', buyOn: '', category: '', name: '', price: 0, quantity: 0},

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

// -------------------------------------------------------
// services
export const fetchBacklogs = createAsyncThunk('backlogs/fetchBacklogs', async () => {
  return backlogService.getAllBacklogs();
});

export const fetchBacklogById = createAsyncThunk(
  'backlogs/fetchBacklogById',
  async (id: string) => {
    return backlogService.getBacklogById(id);
  },
);

export const createBacklog = createAsyncThunk(
  'backlogs/createBacklog',
  async (backlog: IBacklog) => {
    return backlogService.createBacklog(backlog);
  },
);

export const backlogSlice = createSlice({
  name: 'backlogs',
  initialState,
  reducers: {
    // createBacklog: (
    //   state,
    //   action: {payload: {name: string; category: string}; type: string},
    // ) => {
    //   state.backlogs = state.backlogs.concat([
    //     {
    //       name: action.payload.name,
    //       _id: nanoid(),
    //       category: action.payload.category,
    //     },
    //   ]);
    // },
    updateBacklog: (state, action: {payload: IBacklog; type: string}) => {
      state.backlogs = state.backlogs.map((backlogItem: IBacklog) => {
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
        (backlogItem: IBacklog) => backlogItem.id !== action.payload.id,
      );
    },
  },
  extraReducers(builder) {
    builder
      // -----------------------------------------------
      // create backlog
      .addCase(createBacklog.fulfilled, (state, action) => {
        state.createBacklogSuccess = true;
        state.backlogs.push(action.payload);
      })

      // -----------------------------------------------
      // get backlogs
      .addCase(fetchBacklogs.pending, state => {
        state.fetchingBacklogs = true;
      })
      .addCase(fetchBacklogs.fulfilled, (state, action) => {
        state.backlogs = action.payload;
        state.fetchingBacklogs = false;
      })
      .addCase(fetchBacklogs.rejected, state => {
        state.backlogs = [];
        state.fetchingBacklogs = false;
      });
  },
});

const {
  // createBacklog,
  updateBacklog,
  deleteBacklog,
} = backlogSlice.actions;

export const BacklogAction = {
  fetchBacklogs,
  createBacklog,
  updateBacklog,
  deleteBacklog,
};

export default backlogSlice.reducer;
