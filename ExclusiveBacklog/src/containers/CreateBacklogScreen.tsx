import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
import {useCommand} from '../commands/Command';
import {IconButton, TextInput, Button} from 'react-native-paper';
import {makeAutoObservable, observable} from 'mobx';
import {useState} from 'react';
import {CreateBacklogCommand} from '../commands/CreateBacklogCommand';
import Test from '../models/Test';
// import {DatePickerInput} from 'react-native-paper-dates';
import DatePicker from 'react-native-date-picker';

// class --------------------------------------------------------------

interface IBacklog {
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
}

class Backlog {
  name: string = '';
  category: string = '';
  price: number = 0;
  quantity: number = 0;
  buyOn: Date = new Date();

  open: boolean = false;
  date: Date = new Date();

  toggleDate = () => {
    this.open = !this.open;
  };

  constructor() {
    makeAutoObservable(this);
  }

  createBacklog = () => {
    const backlog: IBacklog = {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      buyOn: this.buyOn.toString(),
    };

    // pass to api
  };
}

const backlog = new Backlog();

// --------------------------------------------------------------

// navigation --------------------------------------------------------------
interface CreateBacklogScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateBacklog'>;
}

// --------------------------------------------------------------

@observer
export class CreateBacklogScreen extends React.Component<CreateBacklogScreenProps> {
  constructor(props: CreateBacklogScreenProps) {
    super(props);
  }

  // handleCreate(): void {
  //   const command = new CreateBacklogCommand();
  //   // var x = command.canExecute();

  // }

  handleNameChange = (text: string) => {
    // add command here? or class variable
    backlog.name = text;
  };

  handleCategoryChange = (text: string) => {
    // add command here? or class variable
    backlog.category = text;
  };

  handlePriceChange = (text: string) => {
    // add command here? or class variable
    backlog.price = parseFloat(text);
  };

  handleQuantityChange = (text: string) => {
    // add command here? or class variable
    backlog.quantity = parseFloat(text);
  };

  handleBuyOnChange = (date: Date) => {
    backlog.buyOn = date;
  };

  handleCreateBacklog = () => {
    backlog.createBacklog();
  };

  handleSetOpen = (value: boolean) => {
    backlog.toggleDate();
  };
  handleSetDate = (value: Date) => {
    console.log(value);
  };

  render() {
    const {name, category, price, quantity, buyOn, open, date} = backlog;

    // const [date, setDate] = useState(new Date());
    // const [open, setOpen] = useState(false);
    return (
      <View style={styles.container}>
        {/* <View style={styles.navigationContainer}>
          <IconButton
            icon="qr-code-scanner"
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View> */}
        <View style={styles.contentContainer}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={this.handleNameChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Category"
            value={category}
            onChangeText={this.handleCategoryChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Price"
            keyboardType="numeric"
            value={price?.toString() ?? ''}
            onChangeText={this.handlePriceChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Quantity"
            keyboardType="numeric"
            value={quantity?.toString() ?? ''}
            onChangeText={this.handleQuantityChange}
            mode="outlined"
            style={styles.input}
          />
          {/* <DatePickerInput
            locale="en"
            label="Buy On"
            value={buyOn}
            onChange={date => this.handleBuyOnChange}
            inputMode="start"
          /> */}

          <Button onPress={() => this.handleSetOpen(true)}>Open</Button>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              this.handleSetOpen(false);
              this.handleSetDate(date);
            }}
            onCancel={() => {
              this.handleSetOpen(false);
            }}
          />

          <Button
            icon="save"
            mode="contained"
            onPress={this.handleCreateBacklog}>
            Create Backlog
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  contentContainer: {
    flex: 9,
    backgroundColor: 'steelblue',
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
