import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearchPage: false,
    movieResultsByTMDB: null,
    movieNamesByGPT: null,
    loading: false, // FIX: Added this so you can track loading state
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearchPage = !state.showGptSearchPage;
    },
    addGptMovieResult: (state, action) => {
      const { movieNamesByGPT, movieResultsByTMDB } = action.payload;
      state.movieNamesByGPT = movieNamesByGPT;
      state.movieResultsByTMDB = movieResultsByTMDB;
      state.loading = false; // FIX: Turn off loading when results arrive
    },
    setGptLoading: (state) => {
      state.loading = true;
      // FIX: Use the correct variable names defined in initialState
      state.movieNamesByGPT = null;   
      state.movieResultsByTMDB = null; 
    },
    clearGptMovieResult: (state) => {
      state.movieNamesByGPT = null;
      state.movieResultsByTMDB = null;
      state.loading = false;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, setGptLoading, clearGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;