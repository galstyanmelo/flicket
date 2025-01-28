import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { isSuccess } from "../../utils/NetworkStatus";

export const createSeatService = createAsyncThunk(
  "createSeat/createSeatService",
  async ({ body }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_LEGACY_API}/order/seats/create/`;
    try {
      const response = await axios.post(url, body, { withCredentials: true });
      if (isSuccess(response.status)) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = { data: {}, status: "", error: null };

export const createSeatSlice = createSlice({
  name: "createSeat",
  initialState,
  reducers: {
    resetCreateSeat: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createSeatService.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createSeatService.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(createSeatService.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export const { resetCreateSeat } = createSeatSlice.actions;

export default createSeatSlice.reducer;