import { configureStore } from "@reduxjs/toolkit";

import cinerooms from "./cineroom/CineroomsService";
import movieSearch from "./movie/MovieSearchService"
import moviesTimetables from "./order/MoviesTimetablesService"
import timetableSeats from "./order/TimetableSeatsService"
import createSeat from "./order/CreateSeatService"

export const store = configureStore({
  reducer: {
    cinerooms,
    movieSearch,
    moviesTimetables,
    timetableSeats,
    createSeat
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});