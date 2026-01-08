import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const appStore = configureStore({
  reducer: {
    // Add your reducers from different slices here
    user : userReducer,
  },
});

export default appStore;