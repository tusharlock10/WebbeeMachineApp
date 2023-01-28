import { createDrawerNavigator } from '@react-navigation/drawer';
import { Fonts } from '../../constants/fonts';
import { Dashboard } from '../screens/dashboard';
import { ManageMachineTypes } from '../screens/manageMachineTypes';
import { CustomDrawer } from './drawer';

export type RootParamList = {
  Dashboard: undefined;
  ManageMachineTypes: undefined;
};


export const RootNavigation = () => {
  const Drawer = createDrawerNavigator<RootParamList>();

  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={CustomDrawer}
      screenOptions={{ drawerType: 'slide', drawerPosition: 'left', headerTitleStyle: { fontFamily: Fonts.Oswald } }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="ManageMachineTypes" component={ManageMachineTypes} />
    </Drawer.Navigator>
  );
};