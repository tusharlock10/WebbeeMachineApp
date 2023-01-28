import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { machineTypes } = useSelector((state: RootState) => state.machineType);

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        <Drawer.Item
          label="Dashboard"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item
          label="Manage Machines"
          onPress={() => props.navigation.navigate("ManageMachineTypes")}
        />
      </Drawer.Section>

      {
        machineTypes.map((item) => {
          return <Drawer.Item
            key={item.id}
            label={item.name}
            onPress={() => props.navigation.navigate("GroupedMachines", { machineType: item })}
          />;
        })
      }

    </DrawerContentScrollView>
  );
};