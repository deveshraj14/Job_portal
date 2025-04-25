import { postSlice } from './postSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
  },
});

export default store;
