import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import exclusiveBacklogCategoryService from '../../services/exclusiveBacklogCategoryService';
import {CategoryStateType} from './CategoryStateType';
import {ICategory} from './Category';
import {Status} from '../../types/Status';

const categoryService = new exclusiveBacklogCategoryService();

const initialState: CategoryStateType = {
  categoryStatus: Status.IDLE,
  categoryError: null,
  categories: [],
  // fetchingCategories: false,
  // categories: [],
  // creatingCategory: false,
  // createCategorySuccess: false,
  // createCategoryError: false,

  // updatingCategory: false,
  // updateCategorySuccess: false,
  // updateCategoryError: false,

  // deletingCategory: false,
  // deleteCategorySuccess: false,
  // deleteCategoryError: false,
};

// -------------------------------------------------------
// services
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  return categoryService.getAllCategories();
});

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: ICategory) => {
    return categoryService.createCategory(category);
  },
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoryStatus: state => {
      state.categoryStatus = Status.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      // -----------------------------------------------
      // create category
      .addCase(createCategory.fulfilled, (state, action) => {
        // state.categories.push()
        state.categoryStatus = Status.SUCCEEDED;
        state.categories.push(action.payload);
      })
      // -----------------------------------------------
      // get categories
      .addCase(fetchCategories.pending, state => {
        state.categoryStatus = Status.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoryStatus = Status.SUCCEEDED;
      })
      .addCase(fetchCategories.rejected, state => {
        state.categories = [];
        state.categoryStatus = Status.FAILED;
      });
  },
});

const {
  resetCategoryStatus,
  // createCategory,
  // updateBacklog,
  // deleteBacklog
} = categorySlice.actions;

export const CategoryAction = {
  resetCategoryStatus,
  createCategory,
  fetchCategories,
  // updateBacklog,
  // deleteBacklog,
};

export default categorySlice.reducer;
