import { v4 as uuid } from 'uuid';
import { Machine, MachineField } from '../interface/machine';
import { AttributeTypes, MachineType } from '../interface/machineType';
import { formatDateToString } from './date';

export const getInitialMachineData = (machineType: MachineType) => {
  // takes a machine type, and creates an empty machine data
  const newMachine: Machine = {
    id: uuid(),
    fields: [],
    machineTypeId: machineType.id,
  };
  newMachine.fields = machineType.attributes.map((attribute) => {
    const machineField: MachineField = { attributeId: attribute.id, value: "" };
    if (attribute.type === AttributeTypes.checkBox) {
      machineField.value = "unchecked";
    }
    if (attribute.type === AttributeTypes.date) {
      machineField.value = formatDateToString(new Date());
    }
    return machineField;
  });
  return newMachine;
};