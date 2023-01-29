import type { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceGridNumber, getGridWidth } from '../../../services/device';
import { getInitialMachineData } from '../../../services/machine';
import { addMachine } from '../../../state/slices/machine';
import type { RootState } from '../../../state/store';
import { MachineCard } from '../../common';
import type { RootParamList } from '../../navigation';
import { styles } from './styles';

export const GroupedMachines = ({ route }: Props) => {
  const { machineType } = route.params;

  const dispatch = useDispatch();

  const machines = useSelector((state: RootState) => state.machine.machines.filter((item) => item.machineTypeId === machineType.id));

  const onAddMachine = () => {
    const newMachine = getInitialMachineData(machineType);
    dispatch(addMachine(newMachine));
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={getDeviceGridNumber()}
        data={machines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listStyle}
        ListEmptyComponent={
          <View style={styles.centre}>
            <Text style={styles.emptyText}>Sorry, there are no items</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="titleLarge">{machineType.name}</Text>
            <Button onPress={onAddMachine} icon={"plus"}>Add Item</Button>
          </View>
        }
        renderItem={({ item }) => {
          return <View style={{ padding: 10, width: getGridWidth() }}>
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