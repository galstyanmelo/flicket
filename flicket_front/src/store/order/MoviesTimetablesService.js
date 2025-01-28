import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { isSuccess } from "../../utils/NetworkStatus";

export const moviesTimetablesService = createAsyncThunk(
  "moviesTimetables/moviesTimetablesService",
  async ({ id }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_LEGACY_API}/order/movies/${id}/timetables/`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (isSuccess(response.status)) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = { data: {}, status: "", error: null };

export const moviesTimetablesSlice = createSlice({
  name: "moviesTimetables",
  initialState,
  reducers: {
    resetMoviesTimetables: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(moviesTimetablesService.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(moviesTimetablesService.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(moviesTimetablesService.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export const { resetMoviesTimetables } = moviesTimetablesSlice.actions;

export default moviesTimetablesSlice.reducer;