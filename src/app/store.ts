import { configureStore } from '@reduxjs/toolkit';
import bookSliceReducer from '../features/bookstore/bookSlice';

export const store = configureStore({
  reducer: {
    books: bookSliceReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>


