import { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { AttributeTypes, MachineTypeAttribute } from '../../../interface/machineType';
import { AttributeField } from './attributeField';

export const MachineTypeCard = () => {
  const [name, setName] = useState<string>("");
  const [attributes, setAttributes] = useState<MachineTypeAttribute[]>([]);

  const onChangeName = (name: string, index: number) => {
    attributes[index].name = name;
    setAttributes([...attributes]);
  };

  const onAddField = () => {
    const newAttribute: MachineTypeAttribute = {
      name: "",
      type: AttributeTypes.text,
    };
    setAttributes([...attributes, newAttribute]);
  };

  return (
    <Card>
      <FlatList
        data={attributes}
        renderItem={({ item, index }) => {
          return <AttributeField attribute={item} onChangeName={(newName) => onChangeName(newName, index)} />;
        }}
      />
      <Card.Actions>
        <Button onPress={onAddField}>Add Field</Button>
        <Button>Select title field</Button>
      </Card.Actions>
    </Card>
  );
};