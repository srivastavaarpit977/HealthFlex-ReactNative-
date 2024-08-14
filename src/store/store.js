import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './commentsSlice';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export default store;