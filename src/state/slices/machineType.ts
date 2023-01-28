import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash";
import { AttributeTypes, MachineType } from "../../interface/machineType";

interface MachineTypeState {
  machineTypes: MachineType[];
}

const initialState: MachineTypeState = {
  machineTypes: [{
    id: "kjdhkjhsds",
    name: "Car",
    titleFieldIndex: 1,
    attributes: [
      { id: "jkshdjkashd", name: "Brand", type: AttributeTypes.text },
      { id: "ukhdjkhd", name: "Car Name", type: AttributeTypes.text },
      { id: "skdjklsjd", name: "Price", type: AttributeTypes.number },
      { id: "leidfrlweur", name: "Is Taxi", type: AttributeTypes.checkBox },
      { id: "dkfjksjf", name: "Registration Date", type: AttributeTypes.date },
    ]
  }]
  // machineTypes: [] // TODO: revert this to empty state
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