import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
// import {useCommand} from '../commands/Command';
import {IconButton, TextInput, Button} from 'react-native-paper';
import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
// import {useState} from 'react';
import {
  CreateBacklogCommand,
  CreateBacklogCommandParams,
} from '../commands/CreateBacklogCommand';
// import Test from '../models/Test';
// import {DatePickerInput} from 'react-native-paper-dates';
import DatePicker from 'react-native-date-picker';
import {act} from 'react-test-renderer';
import {useCommand} from '../commands/Command';

// class --------------------------------------------------------------

interface IBacklog {
  name: string;
  price: number;
  quantity: number;
  category: string;
  buyOn: string;
}

// const createBacklogCommand = useCommand(() => new CreateBacklogCommand());

class Backlog {
  name: string = '';
  category: string = '';
  price: number = 0;
  quantity: number = 0;
  buyOn: Date = new Date();

  open: boolean = false;
  date: Date = new Date();

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      // observables
      name: observable,
      category: observable,
      price: observable,
      quantity: observable,
      buyOn: observable,
      open: observable,
      date: observable,

      // actions
      // toggleDate: action,
      handleCreateBacklog: action,
      handleNameChange: action,
      handleCategoryChange: action,
      handlePriceChange: action,
      handleQuantityChange: action,
      handleBuyOnChange: action,
      handleSetOpen: action,
    });
  }

  handleCreateBacklog = () => {
    const backlog: CreateBacklogCommandParams = {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      buyOn: this.buyOn.toString(),
    };

    // createBacklogCommand.execute(backlog);
    // pass to api
  };

  handleNameChange = (text: string) => {
    this.name = text;
  };

  handleCategoryChange = (text: string) => {
    this.category = text;
  };

  handlePriceChange = (text: string) => {
    if (text === '') {
      text = '0';
    }
    this.price = parseFloat(text);
  };

  handleQuantityChange = (text: string) => {
    if (text === '') {
      text = '0';
    }
    this.quantity = parseFloat(text);
  };

  handleBuyOnChange = (value: Date) => {
    console.log(value);
    this.buyOn = value;
  };

  handleSetOpen = (value: boolean) => {
    this.open = !this.open;
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

  render() {
    const {
      name,
      category,
      price,
      quantity,
      buyOn,
      open,
      date,
      handleCreateBacklog,
      handleNameChange,
      handleCategoryChange,
      handlePriceChange,
      handleQuantityChange,
      handleBuyOnChange,
      handleSetOpen,
    } = backlog;

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
            onChangeText={handleNameChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Category"
            value={category}
            onChangeText={handleCategoryChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Price"
            keyboardType="numeric"
            value={price?.toString() ?? '0'}
            onChangeText={handlePriceChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Quantity"
            keyboardType="numeric"
            value={quantity?.toString() ?? '0'}
            onChangeText={handleQuantityChange}
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={() => handleSetOpen(true)}
            style={{marginBottom: 10}}>
            Buy On
          </Button>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              handleSetOpen(false);
              handleBuyOnChange(date);
            }}
            onCancel={() => {
              handleSetOpen(false);
            }}
          />

          <Button icon="save" mode="contained" onPress={handleCreateBacklog}>
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
