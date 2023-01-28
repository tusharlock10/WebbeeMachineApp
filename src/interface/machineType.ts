export enum AttributeTypes {
  date = "date",
  text = "text",
  checkBox = "checkBox",
  number = "number"
}

export interface MachineTypeAttribute {
  id: string;
  name: string; // field name of the attribute
  type: AttributeTypes; // type of the field
}

export interface MachineType {
  id: string;
  name: string; // name of the machine type
  attributes: MachineTypeAttribute[]; // attributes of the machine
  titleFieldIndex: number | null; // title field of the machine based on index of an attribute
}

export interface DraftMachineTypeAttribute extends MachineTypeAttribute {
  error: string | null;
}