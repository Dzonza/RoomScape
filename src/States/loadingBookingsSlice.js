import { createSlice } from '@reduxjs/toolkit';

const loadBookingsSlice = createSlice({
  name: 'loadBookings',
  initialState: {
    isLoaded: true,
  },
  reducers: {
    load: (state) => {
      state.isLoaded = true;
    },
    unLoad: (state) => {
      state.isLoaded = false;
    },
  },
});

export const { load, unLoad } = loadBookingsSlice.actions;
export default loadBookingsSlice.reducer;
