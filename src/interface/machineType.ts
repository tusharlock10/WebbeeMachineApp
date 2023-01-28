export enum AttributeTypes {
  date = "date",
  text = "text",
  checkBox = "checkBox",
  number = "number"
}

export interface MachineTypeAttribute {
  name: string; // field name of the attribute
  type: AttributeTypes; // type of the field
}

export interface MachineType {
  name: string; // name of the machine type
  attributes: MachineTypeAttribute[]; // attributes of the machine
}