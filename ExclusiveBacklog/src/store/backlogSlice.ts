import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import exclusiveBacklogService from '../services/exclusiveBacklogService';
import {BacklogStateType, Status} from '../types/BacklogStateType';
import {IBacklog} from '../models/Backlog';

const backlogService = new exclusiveBacklogService();

const initialState: BacklogStateType = {
  status: Status.IDLE,
  error: null,
  backlogs: [
    // {
    //   _id: nanoid(),
    //   name: 'test 1',
    //   category: 'test 1',
    // },
  ],

  // fetchingBacklogs: false,
  // fetchingBacklogById: false,
  // fetchingBacklogByIdSuccess: false,
  // fetchingBacklogByIdBacklogError: false,
  // backlogById: null,

  // creatingBacklog: false,
  // createBacklogSuccess: false,
  // createBacklogError: false,

  // updatingBacklog: false,
  // updateBacklogSuccess: false,
  // updateBacklogError: false,

  // deletingBacklog: false,
  // deleteBacklogSuccess: false,
  // deleteBacklogError: false,
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
        state.status = Status.SUCCEEDED;
        state.backlogs.push(action.payload);
      })

      // -----------------------------------------------
      // get backlogs
      .addCase(fetchBacklogs.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchBacklogs.fulfilled, (state, action) => {
        state.backlogs = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(fetchBacklogs.rejected, state => {
        state.backlogs = [];
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // get backlog by id
      .addCase(fetchBacklogById.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchBacklogById.fulfilled, (state, action) => {
        // state.backlogById = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(fetchBacklogById.rejected, state => {
        // state.backlogById = null;
        state.status = Status.FAILED;
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
  fetchBacklogById,
  createBacklog,
  updateBacklog,
  deleteBacklog,
};

export default backlogSlice.reducer;
