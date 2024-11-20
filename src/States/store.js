import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import bookingModalReducer from './bookingModalSlice.js';
import loadBookingsReducer from './loadingBookingsSlice.js';
const store = configureStore({
  reducer: {
    auth: authReducer,
    bookingModal: bookingModalReducer,
    loadBookings: loadBookingsReducer,
  },
});

export default store;
