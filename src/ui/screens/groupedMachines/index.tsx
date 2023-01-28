import type { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialMachineData } from '../../../services/machine';
import { addMachine } from '../../../state/slices/machine';
import type { RootState } from '../../../state/store';
import { MachineCard } from '../../common';
import type { RootParamList } from '../../navigation';
import { styles } from './styles';

export const GroupedMachines = ({ route }: Props) => {
  const { machineType } = route.params;

  const dispatch = useDispatch();

  const { machines } = useSelector((state: RootState) => state.machine);

  const onAddMachine = () => {
    const newMachine = getInitialMachineData(machineType);
    dispatch(addMachine(newMachine));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listStyle}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="titleLarge">{machineType.name}</Text>
            <Button onPress={onAddMachine} icon={"plus"}>Add Item</Button>
          </View>
        }
        renderItem={({ item }) => {
          return <View style={{ padding: 10 }}>
            <MachineCard
              machine={item}
              machineType={machineType}
            />
          </View>;
        }}
      />
    </View>
  );
};

type Props = DrawerScreenProps<RootParamList, 'GroupedMachines'>;