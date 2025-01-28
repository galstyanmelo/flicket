import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { isSuccess } from "../../utils/NetworkStatus";

export const cineroomsService = createAsyncThunk(
  "cinrooms/cineroomsService",
  async (_, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_LEGACY_API}/cineroom/`;
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

export const cineroomsSlice = createSlice({
  name: "cinerooms",
  initialState,
  reducers: {
    resetCinerooms: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(cineroomsService.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(cineroomsService.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(cineroomsService.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export const { resetCinerooms } = cineroomsSlice.actions;

export default cineroomsSlice.reducer;