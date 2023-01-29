import { SectionList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Machine } from '../../../interface/machine';
import { MachineType } from '../../../interface/machineType';
import { getInitialMachineData } from '../../../services/machine';
import { addMachine } from '../../../state/slices/machine';
import type { RootState } from '../../../state/store';
import { MachineCard } from '../../common';
import { styles } from './styles';

interface SectionListData {
  title: MachineType,
  data: Machine[];
}

export const Dashboard = () => {
  const { machines } = useSelector((state: RootState) => state.machine);
  const { machineTypes } = useSelector((state: RootState) => state.machineType);

  const dispatch = useDispatch();

  const getData = () => {
    const machineMap: { [key: string]: Machine[]; } = {};
    for (const machine of machines) {
      let mappedMachines = machineMap[machine.machineTypeId];
      if (!mappedMachines) {
        mappedMachines = [];
      }
      mappedMachines.push(machine);
      machineMap[machine.machineTypeId] = mappedMachines;
    }

    const data: SectionListData[] = [];
    const machineTypeIds = Object.keys(machineMap);
    for (const machineTypeId of machineTypeIds) {
      const machineType = machineTypes.find(item => item.id === machineTypeId)!;
      const mappedMachines = machineMap[machineTypeId];
      data.push({ data: mappedMachines, title: machineType });
    }
    return data;
  };

  const onAddMachine = (machineType: MachineType) => {
    const newMachine = getInitialMachineData(machineType);
    dispatch(addMachine(newMachine));
  };

  return (
    <SectionList
      contentContainerStyle={styles.container}
      sections={getData()}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title: machineType } }) => (
        <View style={styles.header}>
          <Text variant="titleLarge">{machineType.name}</Text>
          <Button onPress={() => onAddMachine(machineType)} icon={"plus"}>Add Item</Button>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.centre}>
          <Text style={styles.emptyText}>Sorry, there are no items</Text>
        </View>
      }
      ListFooterComponent={<View style={{ height: 100 }} />}
      renderItem={({ item }) => {
        const machineType = machineTypes.find((machineType) => machineType.id === item.machineTypeId)!;
        return <View style={{ padding: 10 }}>
          <MachineCard
            machine={item}
            machineType={machineType}
          />
        </View>;
      }}
    />
  );
};