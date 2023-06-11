import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Dialog, TextInput, Modal, Text} from 'react-native-paper';
import useNewBacklogViewController from '../viewcontrollers/useNewBacklogViewController';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePickerComponent from '../components/DatePickerComponent';
import CategoryComponent from '../components/CategoryComponent';
import CameraComponent from '../components/CameraComponent';
import {IBacklog} from '../features/backlog/Backlog';
import {ICategory} from '../features/category/Category';

type NewBacklogProps = NativeStackScreenProps<RootStackParamList, 'NewBacklog'>;

const NewBacklogView = ({route, navigation}: NewBacklogProps) => {
  // -----------------------------------------------------------------------------------
  // Controllers

  const {categories, onCategoryFormSubmit, onFormSubmit} = useNewBacklogViewController();

  // -----------------------------------------------------------------------------------
  // React States

  const [backlog, setBacklog] = useState<IBacklog>({
    id: '',
    name: '',
    price: 0,
    quantity: 1,
    category: '',
    buyOn: '',
    base64qrcode: '',
  });
  const [category, setCategory] = useState<ICategory>({
    id: '',
    name: '',
    value: '',
  });

  const [visible, setVisible] = React.useState(false);
  const [camera, setShowCamera] = React.useState(false);

  // -----------------------------------------------------------------------------------
  // React Hooks

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="content-save" mode="text" onPress={() => onFormSubmit(backlog)}>
          Save
        </Button>
      ),
    });
  }, [backlog, category, navigation]);

  // -----------------------------------------------------------------------------------
  // Event Handlers

  // save new category handler
  const onCategorySave = (newCategory: ICategory) => {
    onCategoryFormSubmit(newCategory);
    setVisible(false);
  };

  // update backlog state field value with input value
  const onInputChange = (fieldName: keyof IBacklog, text: string) => {
    setBacklog(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  // update category state field value with category value
  const onCategoryChange = (fieldName: keyof ICategory, text: string) => {
    setCategory(prevState => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const handleTakeImage = () => {
    setShowCamera(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  // -----------------------------------------------------------------------------------
  // View

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Name"
          value={backlog.name}
          onChangeText={text => onInputChange('name', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Price"
          keyboardType="numeric"
          value={backlog.price.toString()}
          onChangeText={text => onInputChange('price', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Quantity"
          keyboardType="numeric"
          value={backlog.quantity.toString()}
          onChangeText={text => onInputChange('quantity', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <DatePickerComponent onBuyOnChange={date => onInputChange('buyOn', date)} />

        <CategoryComponent
          onCategoryChange={category => onInputChange('category', category.id)}
          categories={categories}
          onNewCategoryPress={() => setVisible(true)}
          category={null}
        />
      </View>
      <View>
        {/* <Button
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.formButton}>
          Generate QR Code
        </Button> */}
        <Button icon="camera" mode="contained" onPress={handleTakeImage} style={styles.formButton}>
          Take Image
        </Button>

        <Text>Code QR will be generated automatically after saving this record.</Text>
      </View>

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>New Backlog Category</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={category.name}
            onChangeText={(text: string) => onCategoryChange('name', text)}
            mode="outlined"
            style={styles.formInput}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button icon="close" mode="text" onPress={hideDialog}>
            Cancel
          </Button>
          <Button icon="content-save" mode="text" onPress={() => onCategorySave(category)}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* <Modal visible={isCameraVisible} onDismiss={hideModal}>
        <CameraComponent />
      </Modal> */}
      {camera && (
        <CameraComponent showModal={camera} setModalVisible={() => setShowCamera(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#f8f6f7',
  },
  form: {
    flex: 1,
  },
  formInput: {
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  formButton: {
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    marginBottom: 15,

    // alignSelf: 'flex-end',
    // width: 130,
  },
});

export default NewBacklogView;
