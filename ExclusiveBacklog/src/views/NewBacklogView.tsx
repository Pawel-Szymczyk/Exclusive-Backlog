import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Dialog, TextInput} from 'react-native-paper';
import useNewBacklogViewController from '../viewcontrollers/useNewBacklogViewController';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePickerComponent from '../components/DatePickerComponent';
import CategoryComponent from '../components/CategoryComponent';
import {ICategory} from '../models/Category';

type NewBacklogProps = NativeStackScreenProps<RootStackParamList, 'NewBacklog'>;

const NewBacklogView = ({route, navigation}: NewBacklogProps) => {
  const {
    backlogFormState,
    categoryFormState,
    creatingBacklog,
    onChangeText,
    onChangeCategoryText,
    onFormSubmit,
    onCategoryFormSubmit,
    categories,
    fetchingCategories,
  } = useNewBacklogViewController();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
  };

  const onSaveNewCategoryButtonClick = (params: any) => {
    onCategoryFormSubmit(params);
    setVisible(false);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="content-save" mode="text" onPress={onFormSubmit} disabled={creatingBacklog}>
          Save
        </Button>
      ),
    });
  }, [navigation]);

  const handleBuyOnChange = (newBuyOn: string) => {
    onChangeText('buyOn', newBuyOn);
  };

  const handleCategoryChange = (category: ICategory) => {
    onChangeText('category', category.id);
  };

  const handleOnNewCategoryPress = () => {
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Name"
          value={backlogFormState.name}
          onChangeText={(text: string) => onChangeText('name', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Price"
          keyboardType="numeric"
          value={backlogFormState.price.toString()}
          onChangeText={(text: string) => onChangeText('price', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Quantity"
          keyboardType="numeric"
          value={backlogFormState.quantity.toString()}
          onChangeText={(text: string) => onChangeText('quantity', text)}
          mode="outlined"
          style={styles.formInput}
        />

        <DatePickerComponent onBuyOnChange={handleBuyOnChange} />

        <CategoryComponent
          onCategoryChange={handleCategoryChange}
          categories={categories}
          onNewCategoryPress={handleOnNewCategoryPress}
        />
      </View>
      <View>
        <Button
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.formButton}>
          Generate QR Code
        </Button>
      </View>

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>New Backlog Category</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Name"
            value={categoryFormState.name}
            onChangeText={(text: string) => onChangeCategoryText('name', text)}
            mode="outlined"
            style={styles.formInput}
          />
          <TextInput
            label="Value"
            value={categoryFormState.value}
            onChangeText={(text: string) => onChangeCategoryText('value', text)}
            mode="outlined"
            style={styles.formInput}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button icon="close" mode="text" onPress={hideDialog}>
            Cancel
          </Button>
          <Button icon="content-save" mode="text" onPress={onSaveNewCategoryButtonClick}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFF',
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

    // alignSelf: 'flex-end',
    // width: 130,
  },
});

export default NewBacklogView;
