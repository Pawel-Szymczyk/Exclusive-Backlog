import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, FAB, List} from 'react-native-paper';
import {getAllBacklogs} from '../api/backlogs';
// import {FAB, IconButton, Stack} from '@react-native-material/core';
// import {ListItem} from '@react-native-material/core';

class App extends Component {
  componentDidMount() {
    this.getBacklogs();
  }

  state = {
    data: [],
  };

  async getBacklogs() {
    try {
      const response = await getAllBacklogs();
      console.log(response);
      //   this.setState({data: response});
    } catch (error) {}
  }

  render() {
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
          <List.Item
            title="First Item"
            description="Item description"
            onPress={() => console.log('pressed')}
            left={props => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />

          <FAB
            icon="add"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
          />
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default App;
