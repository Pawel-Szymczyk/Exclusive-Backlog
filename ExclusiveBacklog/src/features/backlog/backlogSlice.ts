import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import exclusiveBacklogService from '../../services/exclusiveBacklogService';
import {BacklogStateType} from './BacklogStateType';
import {IBacklog} from './Backlog';
import {Status} from '../../types/Status';

const backlogService = new exclusiveBacklogService();

const initialState: BacklogStateType = {
  status: Status.IDLE,
  error: null,
  message: '',
  backlog: null,
  backlogs: [
    // {
    //   _id: nanoid(),
    //   name: 'test 1',
    //   category: 'test 1',
    // },
  ],
};

// -------------------------------------------------------
// services
export const fetchBacklogs = createAsyncThunk('backlogs/fetchBacklogs', async () => {
  return backlogService.getAllBacklogsAsync();
});

export const fetchBacklogById = createAsyncThunk(
  'backlogs/fetchBacklogById',
  async (id: string) => {
    return backlogService.getBacklogByIdAsync(id);
  },
);

export const createBacklog = createAsyncThunk(
  'backlogs/createBacklog',
  async (backlog: IBacklog) => {
    return backlogService.createBacklog(backlog);
  },
);

export const deleteBacklogById = createAsyncThunk(
  'backlogs/deleteBacklogById',
  async (id: string) => {
    return backlogService.deleteBacklogAsync(id);
  },
);

export const updateBacklog = createAsyncThunk(
  'backlogs/updateBacklog',
  async (backlog: IBacklog) => {
    return backlogService.updateBacklogAsync(backlog.id, backlog);
  },
);

export const exportToXml = createAsyncThunk('backlogs/exportToXml', async () => {
  return backlogService.exportBacklogsToXmlAsync();
});

export const exportQRCodesAsync = createAsyncThunk('backlogs/exportQRCodesAsync', async () => {
  return backlogService.exportAllQRCodesAsync();
});

export const exportQRCodeByBacklogIdAsync = createAsyncThunk(
  'backlogs/exportQRCodeByBacklogIdAsync',
  async (id: string) => {
    return backlogService.exportQRCodeByBacklogIdAsync(id);
  },
);

export const exportQRCodesByCategoryIdAsync = createAsyncThunk(
  'backlogs/exportQRCodeByCategoryIdAsync',
  async (id: string) => {
    return backlogService.exportQRCodesByCategoryIdAsync(id);
  },
);

export const backlogSlice = createSlice({
  name: 'backlogs',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = Status.IDLE;
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
      .addCase(createBacklog.rejected, state => {
        state.status = Status.FAILED;
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
        state.backlog = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(fetchBacklogById.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // delete backlog by id
      .addCase(deleteBacklogById.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(deleteBacklogById.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(deleteBacklogById.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // update backlog
      .addCase(updateBacklog.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(updateBacklog.fulfilled, (state, action) => {
        state.backlog = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(updateBacklog.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // export backlogs to xml
      .addCase(exportToXml.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(exportToXml.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(exportToXml.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // export qr codes
      .addCase(exportQRCodesAsync.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(exportQRCodesAsync.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(exportQRCodesAsync.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // export qr code by backlog id
      .addCase(exportQRCodeByBacklogIdAsync.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(exportQRCodeByBacklogIdAsync.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(exportQRCodeByBacklogIdAsync.rejected, state => {
        state.status = Status.FAILED;
      })

      // -----------------------------------------------
      // export qr codes by category id
      .addCase(exportQRCodesByCategoryIdAsync.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(exportQRCodesByCategoryIdAsync.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(exportQRCodesByCategoryIdAsync.rejected, state => {
        state.status = Status.FAILED;
      });
  },
});

const {
  resetStatus,
  // createBacklog,
  // updateBacklog,
  // deleteBacklog,
} = backlogSlice.actions;

export const BacklogAction = {
  resetStatus,
  createBacklog,
  fetchBacklogs,
  fetchBacklogById,
  deleteBacklogById,
  updateBacklog,
  exportToXml,
  exportQRCodesAsync,
  exportQRCodeByBacklogIdAsync,
  exportQRCodesByCategoryIdAsync,
};

export default backlogSlice.reducer;
