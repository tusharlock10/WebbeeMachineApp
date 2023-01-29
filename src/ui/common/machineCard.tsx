import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useDispatch, } from 'react-redux';
import { Machine } from '../../interface/machine';
import { MachineType } from '../../interface/machineType';
import { deleteMachine, editMachine } from '../../state/slices/machine';
import { MachineCardField } from './machineCardField';

interface MachineCardProps {
  machineType: MachineType;
  machine: Machine;
}

export const MachineCard = ({ machine, machineType }: MachineCardProps) => {
  const dispatch = useDispatch();

  const getTitleField = () => {
    if (machineType.titleFieldIndex === null) {
      return null;
    }
    const titleAttribute = machineType.attributes[machineType.titleFieldIndex];
    const field = machine.fields.find(item => item.attributeId == titleAttribute.id);
    if (!field) {
      return null;
    }
    return field.value;
  };

  const onChangeValue = (value: string, index: number) => {
    let newFields = [...machine.fields];
    newFields = newFields.map((item, i) => index === i ? { ...machine.fields[i], value } : item);

    dispatch(editMachine({ ...machine, fields: newFields }));
  };

  const onDeletePress = () => {
    dispatch(deleteMachine(machine.id));
  };

  return (
    <Card style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant='bodyLarge'>{getTitleField()}</Text>
        <Button textColor={'red'} onPress={onDeletePress} >Delete</Button>
      </View>
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