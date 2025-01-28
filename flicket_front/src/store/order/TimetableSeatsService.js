import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { isSuccess } from "../../utils/NetworkStatus";

export const timetableSeatsService = createAsyncThunk(
  "timetableSeats/timetableSeatsService",
  async ({ id }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_LEGACY_API}/order/seats/timetable/${id}/`;
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

export const timetableSeatsSlice = createSlice({
  name: "timetableSeats",
  initialState,
  reducers: {
    resetTimetableSeats: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(timetableSeatsService.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(timetableSeatsService.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(timetableSeatsService.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export const { resetTimetableSeats } = timetableSeatsSlice.actions;

export default timetableSeatsSlice.reducer;