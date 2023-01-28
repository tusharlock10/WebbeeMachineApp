import type { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../state/store';
import { MachineCard } from '../../common';
import type { RootParamList } from '../../navigation';
import { styles } from './styles';

export const GroupedMachines = ({ route }: Props) => {
  const { machineType } = route.params;

  const { machines } = useSelector((state: RootState) => state.machine);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{machineType.name}</Text>
      <MachineCard
        machine={machines[0]}
        machineType={machineType}
      />
    </View>
  );
};

type Props = DrawerScreenProps<RootParamList, 'GroupedMachines'>;