import { createSlice } from '@reduxjs/toolkit';
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
      { attributeId: "leidfrlweur", value: "true" },
      { attributeId: "dkfjksjf", value: "2023-01-28" },
    ]
  }]
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
  },
});

export const { } = machineSlice.actions;

export const machineReducer = machineSlice.reducer;