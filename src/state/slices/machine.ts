import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Machine } from "../../interface/machine";
import { MachineTypeAttribute } from "../../interface/machineType";
import { getDefaultAttributeValue } from '../../services/machine';

interface MachineState {
  machines: Machine[];
}

const initialState: MachineState = {
  machines: []
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
      // action.payload is machine id
      const index = state.machines.findIndex((item) => item.id === action.payload);
      _.pullAt(state.machines, [index]);
    },
    deleteMachinesOfType: (state, action: PayloadAction<string>) => {
      // action.payload is machine type id
      const indices = state.machines.map((item, index) => item.machineTypeId === action.payload ? index : -1).filter((value) => value !== -1);
      _.pullAt(state.machines, indices);
    },
    addMachineFieldOfAttribute: (state, action: PayloadAction<{ machineTypeId: string, attribute: MachineTypeAttribute; }>) => {
      // all machines of this machine type will have field created for this attribute
      state.machines = state.machines.map((machine) => {
        if (machine.machineTypeId === action.payload.machineTypeId) {
          machine.fields.push({
            attributeId: action.payload.attribute.id,
            value: getDefaultAttributeValue(action.payload.attribute.type)
          });
        }
        return machine;
      });
    },
    resetMachineFieldsOfAttribute: (state, action: PayloadAction<MachineTypeAttribute>) => {
      // all fields of this attribute, will have their values reset to default
      state.machines = state.machines.map((machine) => {
        machine.fields = machine.fields.map(
          (field) => {
            if (field.attributeId === action.payload.id) {
              field.value = getDefaultAttributeValue(action.payload.type);
            }
            return field;
          }
        );
        return machine;
      });
    },
    deleteMachineFieldsOfAttribute: (state, action: PayloadAction<MachineTypeAttribute>) => {
      // all fields of this attribute will be deleted
      state.machines = state.machines.map((machine) => {
        machine.fields = machine.fields.filter(field => field.attributeId !== action.payload.id);
        return machine;
      });
    },
  },
});

export const {
  addMachine,
  editMachine,
  deleteMachine,
  deleteMachinesOfType,
  addMachineFieldOfAttribute,
  resetMachineFieldsOfAttribute,
  deleteMachineFieldsOfAttribute
} = machineSlice.actions;

export const machineReducer = machineSlice.reducer;