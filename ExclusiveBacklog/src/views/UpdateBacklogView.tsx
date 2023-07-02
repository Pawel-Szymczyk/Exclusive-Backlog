import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Dialog, TextInput, Text} from 'react-native-paper';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CameraComponent from '../components/CameraComponent';
import {IBacklog} from '../features/backlog/Backlog';
import {ICategory} from '../features/category/Category';
import useUpdateBacklogViewController from '../viewcontrollers/useUpdateBacklogController';
import DatePickerComponent from '../components/DatePickerComponent';

type UpdateBacklogProps = NativeStackScreenProps<RootStackParamList, 'UpdateBacklog'>;

const UpdateBacklogView = ({route, navigation}: UpdateBacklogProps) => {
  // -----------------------------------------------------------------------------------
  // Controllers

  const {backlog, categories, onCategoryFormSubmit, onFormSubmit} =
    useUpdateBacklogViewController();

  // -----------------------------------------------------------------------------------
  // React States

  const [newBacklog, setNewBacklog] = useState<IBacklog>({
    id: backlog !== null ? backlog.id : '',
    name: backlog !== null ? backlog.name : '',
    price: backlog !== null ? backlog.price : 0,
    quantity: backlog !== null ? backlog.quantity : 1,
    category: backlog !== null ? backlog.category : '',
    buyOn: backlog !== null ? backlog.buyOn : '',
    base64qrcode: backlog !== null ? backlog.base64qrcode : '',
    base64image: backlog !== null ? backlog.base64image : '',
    createdOn: backlog !== null ? backlog.createdOn : '',
    modifiedOn: backlog !== null ? backlog.modifiedOn : '',
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
        <Button icon="content-save" mode="text" onPress={() => onFormSubmit(newBacklog)}>
          Save
        </Button>
      ),
    });
  }, [newBacklog, category, navigation]);

  // -----------------------------------------------------------------------------------
  // Event Handlers

  // save new category handler
  const onCategorySave = (newCategory: ICategory) => {
    onCategoryFormSubmit(newCategory);
    setVisible(false);
  };

  // update backlog state field value with input value
  const onInputChange = (fieldName: keyof IBacklog, text: string) => {
    setNewBacklog(prevState => ({
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

  // return date in format dd/mm/yyyy to iso date
  const formatBuyOnDate = (date: string) => {
    let [day, month, year] = date.split('/');
    const dateFormatted = new Date(+year, +month - 1, +day);
    return dateFormatted;
  };

  const onTakePhoto = (photoBase64: string) => {
    setShowCamera(false);

    var base64Icon = 'data:image/png;base64,' + photoBase64;

    setNewBacklog(prevState => ({
      ...prevState,
      base64image: base64Icon,
    }));
  };

  // -----------------------------------------------------------------------------------
  // View

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {newBacklog.base64image && (
          <Image
            style={{
              width: 'auto',
              height: 150,
              marginBottom: 15,
            }}
            source={{uri: newBacklog.base64image !== '' ? newBacklog.base64image : undefined}}
          />
        )}

        <TextInput
          label="Name"
          value={newBacklog.name}
          onChangeText={text => onInputChange('name', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Price"
          keyboardType="numeric"
          value={newBacklog.price.toString()}
          onChangeText={text => onInputChange('price', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Quantity"
          keyboardType="numeric"
          value={newBacklog.quantity.toString()}
          onChangeText={text => onInputChange('quantity', text)}
          mode="outlined"
          style={styles.formInput}
        />

        <DatePickerComponent
          buyOn={formatBuyOnDate(newBacklog.buyOn)}
          onBuyOnChange={date => onInputChange('buyOn', date)}
        />
        {/* 

        <CategoryComponent
          category={backlog?.category}
          onCategoryChange={category => onInputChange('category', category.id)}
          categories={categories}
          onNewCategoryPress={() => setVisible(true)}
        /> */}

        <Button icon="camera" mode="contained" onPress={handleTakeImage} style={styles.formButton}>
          Take Image
        </Button>

        <Text>Code QR will be re-generated automatically after saving this record.</Text>
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

    // alignSelf: 'flex-end',
    // width: 130,
  },
});

export default UpdateBacklogView;
