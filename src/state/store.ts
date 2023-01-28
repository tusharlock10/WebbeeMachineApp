import { configureStore } from '@reduxjs/toolkit';
import { machineReducer } from './slices/machine';
import { machineTypeReducer } from './slices/machineType';

export const store = configureStore({
  reducer: {
    machine: machineReducer,
    machineType: machineTypeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;