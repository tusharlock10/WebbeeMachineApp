import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash";
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
    editMachineType: (state, action: PayloadAction<MachineType>) => {
      const index = state.machineTypes.findIndex((item) => item.id === action.payload.id);
      state.machineTypes[index] = action.payload;
    },
    deleteMachineType: (state, action: PayloadAction<string>) => {
      const index = state.machineTypes.findIndex((item) => item.id === action.payload);
      _.pullAt(state.machineTypes, [index]);
    },
  },
});

export const { addMachineType, editMachineType, deleteMachineType } = machineTypeSlice.actions;

export const machineTypeReducer = machineTypeSlice.reducer;