import * as React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
import {useCommand} from '../commands/Command';
import {makeAutoObservable} from 'mobx';
import {IconButton} from 'react-native-paper';
import {HomeViewModel} from '../viewmodels/HomeViewModel';
import {Backlog} from '../models/Backlog';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

interface State {
  data: [];
  isLoading: boolean;
}

interface Response {
  data: any;
  status: number;
}

@observer
export class HomeScreen extends React.Component<HomeScreenProps, State> {
  viewModel: HomeViewModel;

  constructor(props: HomeScreenProps) {
    super(props);

    this.viewModel = new HomeViewModel();

    // this.state = {
    //   data: [],
    //   isLoading: true,
    // };

    this.handleFetchData().then(response => {
      console.log(response);
    });
  }

  handleFetchData = async () => {
    // const response = await fetch(`https://api.sampleapis.com/coffee/hot`);
    // const data = await response.json();
    // console.log(data);
    return await fetch('http://192.168.1.172:3000/exclusive-backlogs')
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // getData = async (url: string): Promise<Response> => {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', url);
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           const response: Response = {
  //             data: JSON.parse(xhr.responseText),
  //             status: xhr.status,
  //           };
  //           resolve(response);
  //         } else {
  //           reject(new Error(`Request failed with status ${xhr.status}`));
  //         }
  //       }
  //     };
  //     xhr.send();
  //   });
  // };

  useEffect() {
    console.log('hello');
    // await this.viewModel.fetchItems();
    this.handleFetchData().then(response => {
      console.log(response);
    });

    // var x = this.getData('https://api.sampleapis.com/coffee/hot');
    // console.log(x);
    // const response = await fetch('https://api.sampleapis.com/coffee/hot', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await response.json();

    // this.setState({
    //   ...this.state,
    //   data: this.viewModel.backlogs,
    //   isLoading: false,
    // });
  }

  renderItem = ({item}: {item: Backlog}) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.category}</Text>
      </View>
    );
  };

  render() {
    // const {data, isLoading} = this.state;
    const {backlogs, isLoading, error} = this.viewModel;

    // if (isLoading) {
    //   return <Text>Loading...</Text>;
    // }

    return (
      <View style={styles.container}>
        <View style={styles.navigationContainer}>
          <IconButton
            icon="qr-code-scanner"
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>{this.viewModel.greeting}</Text>
          {backlogs.map(backlog => (
            <Text>{backlog.name}</Text>
          ))}

          {/* <FlatList
            data={backlogs}
            keyExtractor={item => item._id.toString()}
            renderItem={this.renderItem}
          /> */}
        </View>
      </View>

      // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      // </View>
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
