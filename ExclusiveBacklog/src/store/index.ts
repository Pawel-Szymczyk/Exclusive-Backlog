import {configureStore} from '@reduxjs/toolkit';

import backlogReducer from './backlogSlice';

const store = configureStore({
  reducer: {
    backlog: backlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
