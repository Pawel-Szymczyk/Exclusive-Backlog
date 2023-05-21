import moment from 'moment';
import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

interface DatePickerComponentProps {
  onBuyOnChange: (value: string) => void;
}

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const {onBuyOnChange} = props;

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  // onload
  useEffect(() => {
    onBuyOnChange(moment(date?.toString()).format('DD/MM/YYYY'));
  }, []);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);

      onBuyOnChange(moment(params.date?.toString()).format('DD/MM/YYYY'));
    },
    [setOpen, setDate],
  );

  return (
    <View style={styles.rowContainer}>
      <TextInput
        label="Buy On"
        value={moment(date?.toString()).format('DD/MM/YYYY')}
        mode="outlined"
        style={styles.formInput}
      />

      <Button
        icon="calendar"
        mode="contained"
        onPress={() => setOpen(true)}
        style={styles.formButton}>
        Add Date
      </Button>

      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
      />
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
