import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { expo } from "./app.json";
import { ImportedFonts } from './src/constants/fonts';
import { store } from './src/state/store';
import { Loading } from './src/ui/components';
import { RootNavigation } from './src/ui/navigation';
import { appTheme } from './src/ui/theme';


export default function App() {
  const [fontsLoaded] = useFonts(ImportedFonts);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider theme={appTheme}>
          <RootNavigation />
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(expo.name, () => App);