import {configureStore} from '@reduxjs/toolkit';

import backlogReducer from '../features/backlog/backlogSlice';
import categoryReducer from '../features/category/categorySlice';

const store = configureStore({
  reducer: {
    backlog: backlogReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
