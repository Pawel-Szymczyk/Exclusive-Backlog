import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import useHomeBacklogViewController from '../viewcontrollers/useHomeBacklogViewController';
import {BacklogType} from '../types/BacklogType';

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
  // render() {
  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.heading}>Todo</Text>
        <TouchableOpacity style={styles.btn} onPress={onPressCreate}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={backlogs}
          renderItem={renderBacklogList}
        />
      </View>
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
