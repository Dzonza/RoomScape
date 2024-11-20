import { createSlice } from '@reduxjs/toolkit';

const bookingModalSlice = createSlice({
  name: 'bookingModal',
  initialState: {
    isOpenedId: null,
  },

  reducers: {
    open: (state, action) => {
      state.isOpenedId = action.payload;
    },
    close: (state) => {
      state.isOpenedId = null;
    },
  },
});

export const { open, close } = bookingModalSlice.actions;
export default bookingModalSlice.reducer;
