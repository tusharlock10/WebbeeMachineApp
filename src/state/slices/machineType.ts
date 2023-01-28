import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { MachineType } from "../../interface/machineType";

interface MachineTypeState {
  machineTypes: MachineType[];
}

const initialState: MachineTypeState = {
  machineTypes: []
};

const machineTypeSlice = createSlice({
  name: 'machineType',
  initialState,
  reducers: {
    addMachineType: (state, action: PayloadAction<MachineType>) => {
      state.machineTypes.push(action.payload);
    },
  },
});

export const { addMachineType } = machineTypeSlice.actions;

export const machineTypeReducer = machineTypeSlice.reducer;