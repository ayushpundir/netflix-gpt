import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearchPage: false,
    movieResultsByTMDB: null,
    movieNamesByGPT: null,
    loading: false,
    error: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearchPage = !state.showGptSearchPage;
    },
    addGptMovieResult: (state, action) => {
      const { movieNamesByGPT, movieResultsByTMDB } = action.payload;
      state.movieNamesByGPT = movieNamesByGPT;
      state.movieResultsByTMDB = movieResultsByTMDB;
      state.loading = false;
      state.error = null;
    },
    setGptLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.movieNamesByGPT = null;   
      state.movieResultsByTMDB = null; 
    },
    setGptError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong. Please try again.";
    },
    clearGptMovieResult: (state) => {
      state.showGptSearchPage = false;
      state.movieNamesByGPT = null;
      state.movieResultsByTMDB = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, setGptLoading, setGptError, clearGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;