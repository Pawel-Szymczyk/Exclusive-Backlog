import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Dialog, TextInput, Text} from 'react-native-paper';
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

  const {categories, onCategoryFormSubmit, onFormSubmit, camera, setShowCamera} =
    useNewBacklogViewController();

  // -----------------------------------------------------------------------------------
  // React States

  const [backlog, setBacklog] = useState<IBacklog>({
    id: '',
    name: '',
    price: 0,
    quantity: 1,
    category: '',
    buyOn: new Date().toLocaleDateString('en-gb'),
    base64qrcode: '',
    base64image: '',
    createdOn: '',
    modifiedOn: '',
  });
  const [category, setCategory] = useState<ICategory>({
    id: '',
    name: '',
    value: '',
  });

  const [visible, setVisible] = React.useState(false);

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

  const onTakePhoto = (photoBase64: string) => {
    setShowCamera(false);

    var base64Icon = 'data:image/png;base64,' + photoBase64;

    setBacklog(prevState => ({
      ...prevState,
      base64image: base64Icon,
    }));
  };

  // return date in format dd/mm/yyyy to iso date
  const formatBuyOnDate = (date: string) => {
    let [day, month, year] = date.split('/');
    const dateFormatted = new Date(+year, +month - 1, +day);
    return dateFormatted;
  };

  // -----------------------------------------------------------------------------------
  // View

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {backlog.base64image && (
          <Image
            style={{
              width: 'auto',
              height: 150,
              marginBottom: 15,
            }}
            source={{uri: backlog.base64image !== '' ? backlog.base64image : undefined}}
          />
        )}

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
        <DatePickerComponent
          // buyOn={backlog.buyOn}
          buyOn={formatBuyOnDate(backlog.buyOn)}
          onBuyOnChange={date => onInputChange('buyOn', date)}
        />

        <CategoryComponent
          onCategoryChange={category => onInputChange('category', category.id)}
          categories={categories}
          onNewCategoryPress={() => setVisible(true)}
          category={null}
        />

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

      {camera && (
        <CameraComponent
          isCameraOpen={camera}
          onTakePhoto={onTakePhoto}
          setCameraVisible={() => setShowCamera(false)}
        />
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
  },
});

export default NewBacklogView;
