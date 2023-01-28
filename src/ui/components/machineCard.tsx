import { Card, Text } from 'react-native-paper';
import { Machine } from '../../interface/machine';
import { MachineType } from '../../interface/machineType';

interface MachineCardProps {
  machineType: MachineType;
  machine: Machine;
}

export const MachineCard = ({ machine, machineType }: MachineCardProps) => {
  const getTitleField = () => {
    if (!machineType.titleFieldIndex) {
      return null;
    }
    const titleAttribute = machineType.attributes[machineType.titleFieldIndex];
    const field = machine.fields.find(item => item.attributeId == titleAttribute.id)!;
    return field.value;
  };

  return (
    <Card>
      <Text>{getTitleField()}</Text>
    </Card>
  );
};