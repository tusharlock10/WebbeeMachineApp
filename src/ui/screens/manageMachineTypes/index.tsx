import { FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { MachineType } from '../../../interface/machineType';
import { addMachineType } from '../../../state/slices/machineType';
import type { RootState } from '../../../state/store';
import { MachineTypeCard } from './machineTypeCard';
import { styles } from './styles';

export const ManageMachineTypes = () => {
  const { machineTypes } = useSelector((state: RootState) => state.machineType);

  const dispatch = useDispatch();

  const onCreateMachineType = () => {
    const newMachineType: MachineType = {
      id: uuid(),
      name: "",
      attributes: [],
      titleFieldIndex: null,
    };
    dispatch(addMachineType(newMachineType));
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listStyle}
        data={machineTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <View style={{ padding: 10 }}>
            <MachineTypeCard data={item} />
          </View>;
        }}
      />
      <FAB
        icon={"plus"}
        onPress={onCreateMachineType}
        style={styles.fab}
      />
    </View>
  );
};