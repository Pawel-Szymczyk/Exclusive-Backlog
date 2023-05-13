import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import useHomeBacklogViewController from '../viewcontrollers/useHomeBacklogViewController';
import {FAB, IconButton} from 'react-native-paper';
import ListComponent from '../components/ListComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type HomeBacklogsProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeBacklogs'
>;

const HomeBacklogsView = ({route, navigation}: HomeBacklogsProps) => {
  const {backlogs, onPressBacklogItem, onPressCreate} =
    useHomeBacklogViewController();

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
        <ListComponent
          onListItemPressEventHandler={onPressBacklogItem}
          listItems={backlogs}
          title="Backlogs"
        />
        <FAB icon="plus" style={styles.fab} onPress={onPressCreate} />
      </View>
    </View>
  );
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

export default HomeBacklogsView;
