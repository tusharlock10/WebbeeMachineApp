import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { MachineTypeAttribute } from '../../../interface/machineType';
import { styles } from './styles';

interface AttributeFieldProps {
  attribute: MachineTypeAttribute;
  onChangeName: (name: string) => void;
}

export const AttributeField = (props: AttributeFieldProps) => {
  return <View style={styles.attributeContainer}>
    <TextInput
      error={true}
      label={"Field"}
      value={props.attribute.name}
      onChangeText={props.onChangeName}
    />
    <HelperText type="error" visible={true}>
      Email address is invalid!
    </HelperText>
  </View>;
};