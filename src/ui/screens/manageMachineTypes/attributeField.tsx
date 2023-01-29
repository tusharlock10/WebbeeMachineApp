import _ from "lodash";
import { useState } from 'react';
import { View } from 'react-native';
import { Chip, Divider, HelperText, Menu, TextInput } from 'react-native-paper';
import { AttributeTypes, DraftMachineTypeAttribute } from '../../../interface/machineType';
import { styles } from './styles';

interface AttributeFieldProps {
  attribute: DraftMachineTypeAttribute;
  onChangeName: (name: string) => void;
  onChangeType: (type: AttributeTypes) => void;
  onRemove: () => void;
}

export const AttributeField = (props: AttributeFieldProps) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onPressType = (type: AttributeTypes) => {
    toggleMenu();
    props.onChangeType(type);
  };

  return <View style={styles.attributeContainer}>
    <View style={styles.attributeFieldContainer}>
      <TextInput
        mode={"outlined"}
        style={{ flex: 1 }}
        error={!!props.attribute.error}
        label={"Field"}
        value={props.attribute.name}
        onChangeText={props.onChangeName}
        maxLength={30}
      />
      <View style={{ width: 10 }} />
      <Menu visible={menuVisible}
        onDismiss={toggleMenu}
        anchor={<Chip onPress={toggleMenu}>{_.capitalize(props.attribute.type)}</Chip>}>
        <Menu.Item dense={true} title={_.capitalize(AttributeTypes.checkBox)} onPress={() => onPressType(AttributeTypes.checkBox)} />
        <Menu.Item dense={true} title={_.capitalize(AttributeTypes.text)} onPress={() => onPressType(AttributeTypes.text)} />
        <Menu.Item dense={true} title={_.capitalize(AttributeTypes.date)} onPress={() => onPressType(AttributeTypes.date)} />
        <Menu.Item dense={true} title={_.capitalize(AttributeTypes.number)} onPress={() => onPressType(AttributeTypes.number)} />
        <Divider />
        <Menu.Item title={"Remove"} titleStyle={{ color: "red" }} onPress={props.onRemove} />
      </Menu>
    </View>
    {
      props.attribute.error && <HelperText type="error">
        {props.attribute.error}
      </HelperText>
    }
  </View>;
};