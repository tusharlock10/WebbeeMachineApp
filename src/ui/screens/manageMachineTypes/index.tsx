import type { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../state/store';
import type { RootParamList } from '../../navigation';
import { MachineTypeCard } from './machineTypeCard';
import { styles } from './styles';

export const ManageMachineTypes = ({ navigation }: Props) => {
  const { machineTypes } = useSelector((state: RootState) => state.machineType);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <MachineTypeCard />
    </View>
  );
};

type Props = DrawerScreenProps<RootParamList, 'ManageMachineTypes'>;