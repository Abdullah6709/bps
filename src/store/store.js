import { configureStore } from '@reduxjs/toolkit';
import stationReducer from '../features/stations/stationSlice';

export const store = configureStore({
  reducer: {
    stations: stationReducer,
  },
});

export default store;