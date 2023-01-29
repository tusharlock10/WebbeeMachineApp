import { v4 as uuid } from 'uuid';
import { Machine } from '../interface/machine';
import { AttributeTypes, MachineType } from '../interface/machineType';
import { formatDateToString } from './date';

export const getDefaultAttributeValue = (attributeType: AttributeTypes) => {
  if (attributeType === AttributeTypes.checkBox) {
    return "unchecked";
  }
  if (attributeType === AttributeTypes.date) {
    return formatDateToString(new Date());
  }
  return "";
};

export const getInitialMachineData = (machineType: MachineType) => {
  // takes a machine type, and creates an empty machine data
  const newMachine: Machine = {
    id: uuid(),
    fields: [],
    machineTypeId: machineType.id,
  };
  newMachine.fields = machineType.attributes.map((attribute) => ({
    attributeId: attribute.id,
    value: getDefaultAttributeValue(attribute.type)
  }));
  return newMachine;
};