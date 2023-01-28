import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useDispatch, } from 'react-redux';
import { Machine } from '../../interface/machine';
import { MachineType } from '../../interface/machineType';
import { editMachineType } from '../../state/slices/machine';
import { MachineCardField } from './machineCardField';

interface MachineCardProps {
  machineType: MachineType;
  machine: Machine;
}

export const MachineCard = ({ machine, machineType }: MachineCardProps) => {
  const dispatch = useDispatch();

  const getTitleField = () => {
    if (!machineType.titleFieldIndex) {
      return null;
    }
    const titleAttribute = machineType.attributes[machineType.titleFieldIndex];
    const field = machine.fields.find(item => item.attributeId == titleAttribute.id)!;
    return field.value;
  };

  const onChangeValue = (value: string, index: number) => {
    let newFields = [...machine.fields];
    newFields = newFields.map((item, i) => index === i ? { ...machine.fields[i], value } : item);

    dispatch(editMachineType({ ...machine, fields: newFields }));
  };

  return (
    <Card style={{ padding: 10 }}>
      <Text variant='bodyLarge'>{getTitleField()}</Text>
      {
        machine.fields.map((item, index) => {
          return <View key={item.attributeId} style={{ marginTop: 5 }}>
            <MachineCardField machineField={item} machineType={machineType} onChange={(value) => onChangeValue(value, index)} />
          </View>;
        })
      }
    </Card>
  );
};