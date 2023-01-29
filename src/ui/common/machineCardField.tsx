import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, Text, TextInput } from 'react-native-paper';
import { MachineField } from '../../interface/machine';
import { AttributeTypes, MachineType, } from '../../interface/machineType';
import { formatDateToString, parseDateFromString } from '../../services/date';

interface MachineCardFieldProps {
  machineType: MachineType;
  machineField: MachineField;
  onChange: (value: string) => void;
}

export const MachineCardField = (props: MachineCardFieldProps) => {
  const { machineField, machineType } = props;

  const attribute = machineType.attributes.find((item) => item.id === machineField.attributeId);

  const [visible, setVisible] = useState(false);

  const onPressCheckbox = () => {
    if (machineField.value === 'checked') {
      props.onChange('unchecked');
    } else {
      props.onChange('checked');
    }
  };

  const onSelectDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      props.onChange(formatDateToString(selectedDate));
    }
    setVisible(false);
  };
  if (!attribute) {
    return <></>;
  }

  if (attribute.type === AttributeTypes.text) {
    return <TextInput
      value={machineField.value}
      mode={"outlined"}
      label={attribute.name}
      maxLength={30}
      onChangeText={props.onChange}
    />;
  }
  if (attribute.type === AttributeTypes.number) {
    return <TextInput
      value={machineField.value}
      mode={"outlined"}
      label={attribute.name}
      maxLength={30}
      keyboardType={'number-pad'}
      onChangeText={props.onChange}
    />;
  }
  if (attribute.type === AttributeTypes.checkBox) {
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox
        status={machineField.value as "checked" | "unchecked"}
        onPress={onPressCheckbox}
      />
      <View style={{ width: 5 }} />
      <Text>{attribute.name}</Text>
    </View>;
  }
  if (attribute.type === AttributeTypes.date) {
    return <View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setVisible(true)}>
        <TextInput
          mode={"outlined"}
          label={attribute?.name}
          value={machineField.value}
          editable={false}
        />
      </TouchableOpacity>
      {
        visible && <DateTimePicker
          mode="date"
          value={parseDateFromString(machineField.value)}
          onChange={onSelectDate}
        />
      }
    </View>;
  }

  return <></>;
};
