import { createDrawerNavigator } from '@react-navigation/drawer';
import { Fonts } from '../../constants/fonts';
import { MachineType } from '../../interface/machineType';
import { Dashboard } from '../screens/dashboard';
import { GroupedMachines } from '../screens/groupedMachines';
import { ManageMachineTypes } from '../screens/manageMachineTypes';
import { CustomDrawer } from './drawer';

export type RootParamList = {
  Dashboard: undefined;
  ManageMachineTypes: undefined;
  GroupedMachines: { machineType: MachineType; };
};


export const RootNavigation = () => {
  const Drawer = createDrawerNavigator<RootParamList>();

  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={CustomDrawer}
      screenOptions={{ drawerType: 'slide', drawerPosition: 'left', headerTitleStyle: { fontFamily: Fonts.Oswald } }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen options={{ headerTitle: "Manage Machines" }} name="ManageMachineTypes" component={ManageMachineTypes} />
      <Drawer.Screen options={({ route }) => ({ title: route.params?.machineType.name ?? "Machines" })} name="GroupedMachines" component={GroupedMachines} />
    </Drawer.Navigator>
  );
};