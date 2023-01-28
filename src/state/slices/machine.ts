import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Machine } from "../../interface/machine";

interface MachineState {
  machines: Machine[];
}

const initialState: MachineState = {
  machines: [{
    id: "kjsdjkjdkjs",
    machineTypeId: "kjdhkjhsds",
    fields: [
      { attributeId: "jkshdjkashd", value: "Hyundai" },
      { attributeId: "ukhdjkhd", value: "Super Car" },
      { attributeId: "skdjklsjd", value: "8737" },
      { attributeId: "leidfrlweur", value: "checked" },
      { attributeId: "dkfjksjf", value: "2023-01-10" },
    ]
  }]
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    addMachine: (state, action: PayloadAction<Machine>) => {
      state.machines.push(action.payload);
    },
    editMachine: (state, action: PayloadAction<Machine>) => {
      const index = state.machines.findIndex((item) => item.id === action.payload.id);
      state.machines[index] = action.payload;
    },
    deleteMachine: (state, action: PayloadAction<string>) => {
      const index = state.machines.findIndex((item) => item.id === action.payload);
      _.pullAt(state.machines, [index]);
    },
  },
});

export const { addMachine, editMachine, deleteMachine } = machineSlice.actions;

export const machineReducer = machineSlice.reducer;