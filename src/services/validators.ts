import { MachineType, MachineTypeAttribute } from '../interface/machineType';

export const isMachineTypeAttributeValid = (attributes: MachineTypeAttribute[], attribute: MachineTypeAttribute): string | null => {
  if (!attribute.name.trim()) {
    return "Field name cannot be empty";
  }
  for (const item of attributes) {

    if (attribute.name === item.name && attribute.id !== item.id) {
      return "Field name already exists";
    }
  }
  return null;
};

export const isMachineTypeValid = (machineTypes: MachineType[], newMachineType: MachineType): string | null => {
  // machine type is valid when it has
  // 1. a unique name
  // 2. atleast 1 valid attribute
  for (const machineType of machineTypes) {
    if (machineType.name == newMachineType.name) {
      return "Machine type with this name already exists";
    }
  }
  for (const attribute of newMachineType.attributes) {
    const value = isMachineTypeAttributeValid(newMachineType.attributes, attribute);
    if (value) {
      return value;
    }
  }

  return null;
};