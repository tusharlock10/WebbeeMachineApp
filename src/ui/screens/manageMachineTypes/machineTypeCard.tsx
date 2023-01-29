import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Button, Card, Divider, HelperText, Menu, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AttributeTypes, DraftMachineTypeAttribute, MachineType } from '../../../interface/machineType';
import { isMachineTypeAttributeValid } from '../../../services/validators';
import { addMachineFieldOfAttribute, deleteMachineFieldsOfAttribute, deleteMachinesOfType, resetMachineFieldsOfAttribute } from '../../../state/slices/machine';
import { deleteMachineType, editMachineType } from '../../../state/slices/machineType';
import { AttributeField } from './attributeField';

interface MachineTypeCardProps {
  data: MachineType;
}

export const MachineTypeCard = ({ data }: MachineTypeCardProps) => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [titleFieldIndex, setTitleFieldIndex] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<DraftMachineTypeAttribute[]>([]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [titleMenuVisible, setTitleMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    setName(data.name);
    setTitleFieldIndex(data.titleFieldIndex);

    const draftAttributes: DraftMachineTypeAttribute[] = data.attributes.map((attribute) => ({ ...attribute, error: null }));
    setAttributes(draftAttributes);
  }, []);

  const toggleTitleMenu = () => {
    setTitleMenuVisible(!titleMenuVisible);
  };

  const insertMachineType = (name: string, titleFieldIndex: number | null, attributes: DraftMachineTypeAttribute[]) => {
    const machineType: MachineType = {
      id: data.id,
      name: name,
      titleFieldIndex: titleFieldIndex,
      attributes: attributes,
    };
    dispatch(editMachineType(machineType));
  };

  const onDeletePress = () => {
    // delete all machines for this machine type
    dispatch(deleteMachinesOfType(data.id));
    // delete machine type
    dispatch(deleteMachineType(data.id));
  };

  const onChangeName = (name: string) => {
    if (!name.trim()) {
      setNameError("Machine type name cannot be empty");
    } else {
      setNameError(null);
    }
    setName(name);
    insertMachineType(name, titleFieldIndex, attributes);
  };

  const onChangeAttributeName = (attributeName: string, index: number) => {
    const newAttribute = { ...attributes[index], name: attributeName };
    const error = isMachineTypeAttributeValid(attributes, newAttribute);
    newAttribute.error = error;

    attributes[index] = newAttribute;
    setAttributes([...attributes]);

    if (!error) {
      insertMachineType(name, titleFieldIndex, attributes);
    }
  };

  const onChangeAttributeType = (attributeType: AttributeTypes, index: number) => {
    const attribute = { ...attributes[index] };
    if (attribute.type === attributeType) {
      // no change in type, return
      return;
    }

    attribute.type = attributeType;
    attributes[index] = attribute;
    setAttributes([...attributes]);

    // if the type changes, then reset values of all machine fields of this attribute
    dispatch(resetMachineFieldsOfAttribute(attribute));
    insertMachineType(name, titleFieldIndex, attributes);
  };

  const onRemoveAttribute = (index: number) => {
    const attribute = _.pullAt(attributes, [index])[0];

    let tempTitleFieldIndex = titleFieldIndex;
    if (index === titleFieldIndex) {
      tempTitleFieldIndex = null;
      setTitleFieldIndex(tempTitleFieldIndex);
    }

    setAttributes([...attributes]);

    // remove this attribute from all machines
    dispatch(deleteMachineFieldsOfAttribute(attribute));
    insertMachineType(name, tempTitleFieldIndex, attributes);
  };

  const onAddField = () => {
    const newAttribute: DraftMachineTypeAttribute = {
      id: uuid(),
      name: "",
      type: AttributeTypes.text,
      error: null,
    };

    const newAttributes = [...attributes, newAttribute];

    // add this new field to existing machines
    dispatch(addMachineFieldOfAttribute({
      attribute: newAttribute,
      machineTypeId: data.id,
    }));
    setAttributes(newAttributes);
  };

  const onChangeTitleField = (titleFieldName: string) => {
    toggleTitleMenu();

    const tempTitleFieldIndex = attributes.findIndex((item) => item.name == titleFieldName);
    setTitleFieldIndex(tempTitleFieldIndex);
    insertMachineType(name, tempTitleFieldIndex, attributes);
  };

  const getValidAttributes = () => attributes.filter((item) => {
    const error = isMachineTypeAttributeValid(attributes, item);
    return !error;
  });

  return (
    <Card>
      <TextInput
        label={"Enter Machine Type"}
        value={name}
        error={!!nameError}
        onChangeText={onChangeName}
      />
      {
        nameError && <HelperText type="error">
          {nameError}
        </HelperText>
      }
      <Divider style={{ marginVertical: 10 }} bold={true} />
      {
        attributes.map((attribute, index) => {
          return <AttributeField
            key={attribute.id}
            attribute={attribute}
            onChangeName={(newName) => onChangeAttributeName(newName, index)}
            onChangeType={(type) => onChangeAttributeType(type, index)}
            onRemove={() => onRemoveAttribute(index)}
          />;
        })
      }
      {
        titleFieldIndex != null ? <Text style={{ margin: 10 }}>{`Title Field : ${attributes[titleFieldIndex].name}`}</Text> : null
      }
      <Card.Actions style={{ flexGrow: 1 }}>
        <Button mode='text' textColor='red' onPress={onDeletePress}>Delete</Button>
        <Button mode='text' onPress={onAddField}>Add Field</Button>
        {
          !!getValidAttributes().length &&
          <Menu
            visible={titleMenuVisible}
            anchor={<Button onPress={toggleTitleMenu} mode='contained'>{"Select title field"}</Button>}
            onDismiss={toggleTitleMenu}
          >
            {
              getValidAttributes().map((item) => {
                return <Menu.Item key={item.id} title={item.name} onPress={() => onChangeTitleField(item.name)} />;
              })
            }
          </Menu>
        }
      </Card.Actions>
    </Card>
  );
};