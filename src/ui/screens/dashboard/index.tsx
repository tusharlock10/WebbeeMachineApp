import type { DrawerScreenProps } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../state/store';
import type { RootParamList } from '../../navigation';
import { styles } from './styles';

export const Dashboard = ({ navigation }: Props) => {
  const { machineTypes } = useSelector((state: RootState) => state.machineType);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <FlatList
        data={machineTypes}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

type Props = DrawerScreenProps<RootParamList, 'Dashboard'>;