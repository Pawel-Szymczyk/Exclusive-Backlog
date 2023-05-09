import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import useHomeBacklogViewController from '../viewcontrollers/useHomeBacklogViewController';
import {BacklogType} from '../types/BacklogType';
import {IconButton} from 'react-native-paper';
import TableComponent from '../components/TableComponent';

// export default class Home extends React.Component {
//   buttonPressed(): void {
//     console.log('Button pressed');
//   }
//   render(): React.ReactNode {
//     return (
//       <View style={styles.container}>
//         <Text>THIS IS HOME SCREEN</Text>
//         <StatusBar style="auto" />
//         <Button
//           onPress={this.buttonPressed}
//           title="Learn More"
//           color="#841584"
//           accessibilityLabel="Learn more about this purple button"
//         />
//       </View>
//     );
//   }
// }

const Home = () => {
  const {backlogs, onPressBacklogItem, onPressCreate} =
    useHomeBacklogViewController();

  // export default class Home extends React.Component {
  const renderBacklogList = ({item}: {item: BacklogType}) => {
    return (
      <TouchableOpacity onPress={() => onPressBacklogItem(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const buttonPressed = (): void => {
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        {/* <IconButton
          icon="qr-code-scanner"
          size={20}
          onPress={() => console.log('Pressed')}
        /> */}
      </View>
      <View style={styles.contentContainer}>
        {/* <FlatList
          keyExtractor={item => item.id}
          data={backlogs}
          renderItem={renderBacklogList}
        /> */}
        {/* <ScrollView> */}
        <TableComponent
          onPressEventHandler={() => buttonPressed}
          items={backlogs}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
  // }
};

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

export default Home;
