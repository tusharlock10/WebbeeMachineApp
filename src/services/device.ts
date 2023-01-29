import { Dimensions } from 'react-native';

export const getDeviceGridNumber = () => {
  const { width } = Dimensions.get('window');
  return width > 400 ? 2 : 1;
};

export const getGridWidth = () => {
  const { width } = Dimensions.get('window');
  return width > 400 ? width / 2 : width;
};