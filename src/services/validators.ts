import { MachineTypeAttribute } from '../interface/machineType';

const isMachineAttributeValid = (attribute: MachineTypeAttribute):boolean => {
  if (!attribute.name){
    return false
  }
  return true
}

const isMachineTypeValid = () => {
  // machine type is valid when it has
  // 1. a unique name
  // 2. atleast 1 valid attribute

}