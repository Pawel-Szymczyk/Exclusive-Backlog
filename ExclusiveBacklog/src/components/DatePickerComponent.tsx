import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerComponentProps {
  buyOn: Date;
  onBuyOnChange: (value: string) => void;
}

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const {buyOn, onBuyOnChange} = props;
  const [date, setDate] = useState(buyOn);
  const [show, setShow] = useState(false);

  const onChange = React.useCallback(
    (event: any, selectedDate: any) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      onBuyOnChange(new Date(currentDate).toLocaleDateString('en-gb'));
    },
    [setShow, setDate],
  );

  return (
    <View style={styles.rowContainer}>
      <TextInput
        label="Buy On"
        value={new Date(date).toLocaleDateString('en-gb')}
        mode="outlined"
        style={styles.formInput}
      />

      <Button
        icon="calendar"
        mode="contained"
        onPress={() => setShow(true)}
        style={styles.formButton}>
        Add Date
      </Button>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

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
    flex: 1,
    marginRight: 10,
    backgroundColor: '#FFF',
  },

  formButton: {
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    alignSelf: 'flex-end',
    width: 130,
  },
});

export default DatePickerComponent;
