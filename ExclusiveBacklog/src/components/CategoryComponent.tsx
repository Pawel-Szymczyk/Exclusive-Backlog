import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Dialog} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {CategoryType} from '../types/CategoryType';
import {ICategory} from '../models/Category';

interface CategoryComponentProps {
  onCategoryChange: (value: ICategory) => void;
  categories: ICategory[];
  onNewCategoryPress: () => void;
}

const CategoryComponent = (props: CategoryComponentProps) => {
  const {categories, onCategoryChange, onNewCategoryPress} = props;

  return (
    <View style={styles.rowContainer}>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem, index) => {
          // console.log(selectedItem, index);
          onCategoryChange(selectedItem);
        }}
        defaultButtonText={'Select category'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.value;
        }}
        rowTextForSelection={(item, index) => {
          return item.value;
        }}
        buttonStyle={styles.formInput}
        // buttonTextStyle={styles.dropdown4BtnTxtStyle}
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
        // dropdownStyle={styles.dropdown4DropdownStyle}
        // rowStyle={styles.dropdown4RowStyle}
        // rowTextStyle={styles.dropdown4RowTxtStyle}
      />

      <Button
        icon="folder"
        mode="contained"
        onPress={onNewCategoryPress}
        style={styles.formButton}>
        Add Cat...
      </Button>
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  formInput: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
    width: '60%',
  },

  formButton: {
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    alignSelf: 'flex-end',
    width: 130,
  },

  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
