import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { isSuccess } from "../../utils/NetworkStatus";

export const movieSearchService = createAsyncThunk(
  "movieSearch/movieSearchService",
  async ({ page, body = {}}, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_LEGACY_API}/movie/`;
    try {
      const response = await axios.get(url, { 
        withCredentials: true,
        params: {
          ...body,
          limit: process.env.REACT_APP_MOVIE_LIST_LIMIT,
          offset: process.env.REACT_APP_MOVIE_LIST_LIMIT * page
        }
      });
      if (isSuccess(response.status)) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = { data: {}, status: "", error: null };

export const movieSearchSlice = createSlice({
  name: "movieSearch",
  initialState,
  reducers: {
    resetMovieSearch: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(movieSearchService.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(movieSearchService.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(movieSearchService.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export const { resetMovieSearch } = movieSearchSlice.actions;

export default movieSearchSlice.reducer;