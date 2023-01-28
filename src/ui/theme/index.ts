import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { Fonts } from '../../constants/fonts';

export const appTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({
    config: {
      fontFamily: Fonts.Poppins,
      fontWeight: 'normal',
    },
    isV3: true,
  })
};