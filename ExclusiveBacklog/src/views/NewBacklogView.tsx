import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import useNewBacklogViewController from '../viewcontrollers/useNewBacklogViewController';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <TextInput
        label="Name"
        value={formState.name}
        onChangeText={(text: string) => onChangeText('name', text)}
        mode="outlined"
      />
      <View style={styles.categoryContainer}>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'Select category'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.value;
          }}
          rowTextForSelection={(item, index) => {
            return item.value;
          }}
          buttonStyle={styles.dropdown4BtnStyle}
          buttonTextStyle={styles.dropdown4BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown4DropdownStyle}
          rowStyle={styles.dropdown4RowStyle}
          rowTextStyle={styles.dropdown4RowTxtStyle}
        />
        <Button
          icon="plus"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={{flexBasis: '30%', margin: 10}}>
          Add New
        </Button>
      </View>

      {/* <TextInput
        label="Category"
        value={formState.category}
        onChangeText={(text: string) => onChangeText('category', text)}
        mode="outlined"
      /> */}
      {/* <TextInput
        label="Quality"
        keyboardType = 'numeric'
        value={formState.quality}
        onChangeText={(text: string) => onChangeText('quality', text)}
        mode="outlined"
      />
      <TextInput
        label="Name"
        value={formState.name}
        onChangeText={(text: string) => onChangeText('name', text)}
        mode="outlined"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  categoryContainer: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default NewBacklogView;
