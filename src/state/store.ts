import { configureStore } from '@reduxjs/toolkit';
import { machineTypeReducer } from './slices/machineType';

export const store = configureStore({
  reducer: {
    machineType: machineTypeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;