import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { expo } from "./app.json";
import { ImportedFonts } from './src/constants/fonts';
import { persistor, store } from './src/state/store';
import { Loading } from './src/ui/common';
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
        <PersistGate persistor={persistor} loading={null}>
          <PaperProvider theme={appTheme}>
            <RootNavigation />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(expo.name, () => App);