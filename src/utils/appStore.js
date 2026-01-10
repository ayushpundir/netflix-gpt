import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';

const appStore = configureStore({
  reducer: {
    // Add your reducers from different slices here
    user : userReducer,
    movies : movieReducer,
  },
});

export default appStore;