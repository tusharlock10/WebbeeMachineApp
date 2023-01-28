export interface MachineField {
  attributeId: string;
  value: string;
}

export interface Machine {
  id: string;
  machineTypeId: string,
  fields: MachineField[];
}