import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section >
        <Drawer.Item
          label="Dashboard1"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
      </Drawer.Section>
      <Drawer.Item
        label="Manage Machines"
        onPress={() => props.navigation.navigate("ManageMachineTypes")}
      />
    </DrawerContentScrollView>
  );
};