import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import gptReducer from './gptSlice';

const appStore = configureStore({
  reducer: {
    // Add your reducers from different slices here
    user : userReducer,
    movies : movieReducer,
    gpt : gptReducer,
  },
});

export default appStore;