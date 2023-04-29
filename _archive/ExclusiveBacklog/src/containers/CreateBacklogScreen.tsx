// import React, {Component} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
// import {IconButton, FAB, List} from 'react-native-paper';
import {observer} from 'mobx-react';
// import {CreateBacklogCommand} from '../commands/CreateBacklogCommand';
// import {useCommand} from '../commands/Command';

// export const MainScreen: React.FunctionComponent = observer(props => {});

export interface ICreateBacklogScreenProps {}

export const CreateBacklogScreen: React.FunctionComponent<ICreateBacklogScreenProps> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  observer(props => {
    // const createBacklogCommand = useCommand(() => new CreateBacklogCommand());

    return (
      <View style={styles.container}>
        <View style={styles.navigationContainer}></View>
        <View style={styles.contentContainer}></View>
      </View>
    );
  });

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
