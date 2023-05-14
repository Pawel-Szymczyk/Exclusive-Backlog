import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import CategoryStore from './categoryStore';
import exclusiveBacklogCategoryService from '../services/exclusiveBacklogCategoryService';

const initialState = CategoryStore;
const categoryService = new exclusiveBacklogCategoryService();

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    return categoryService.getAllCategories();
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategory: (
      state,
      action: {payload: {name: string; value: string}; type: string},
    ) => {
      state.categories = state.categories.concat([
        {
          name: action.payload.name,
          value: action.payload.value,
          _id: nanoid(),
        },
      ]);
    },
    // updateBacklog: (state, action: {payload: BacklogType; type: string}) => {
    //   state.backlogs = state.backlogs.map((backlogItem: BacklogType) => {
    //     if (backlogItem._id === action.payload._id) {
    //       backlogItem.name = action.payload.name;
    //       return backlogItem;
    //     }
    //     return backlogItem;
    //   });
    //   state.backlogs.concat([action.payload]);
    // },
    // deleteBacklog: (state, action: {payload: {id: string}; type: string}) => {
    //   state.backlogs = state.backlogs.filter(
    //     (backlogItem: BacklogType) => backlogItem._id !== action.payload.id,
    //   );
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, state => {
      state.fetchingCategories = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.fetchingCategories = false;
    });
    builder.addCase(fetchCategories.rejected, state => {
      state.categories = [];
      state.fetchingCategories = false;
    });
  },
});

const {
  createCategory,
  // updateBacklog,
  // deleteBacklog
} = categorySlice.actions;

export const CategoryAction = {
  fetchCategories,
  createCategory,
  // updateBacklog,
  // deleteBacklog,
};

export default categorySlice.reducer;
