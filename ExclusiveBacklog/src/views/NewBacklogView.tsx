import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import useNewBacklogViewController from '../viewcontrollers/useNewBacklogViewController';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePickerComponent from '../components/DatePickerComponent';
import CategoryComponent from '../components/CategoryComponent';

type NewBacklogProps = NativeStackScreenProps<RootStackParamList, 'NewBacklog'>;

const NewBacklogView = ({route, navigation}: NewBacklogProps) => {
  const {
    formState,
    creatingBacklog,
    onChangeText,
    onFormSubmit,
    categories,
    fetchingCategories,
  } = useNewBacklogViewController();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="content-save"
          mode="text"
          onPress={onFormSubmit}
          disabled={creatingBacklog}>
          Save
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Name"
          value={formState.name}
          onChangeText={(text: string) => onChangeText('name', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Price"
          keyboardType="numeric"
          value={formState.price}
          onChangeText={(text: string) => onChangeText('price', text)}
          mode="outlined"
          style={styles.formInput}
        />
        <TextInput
          label="Quantity"
          keyboardType="numeric"
          value={formState.quantity}
          onChangeText={(text: string) => onChangeText('quantity', text)}
          mode="outlined"
          style={styles.formInput}
        />

        <DatePickerComponent />

        <CategoryComponent categories={categories} />
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
