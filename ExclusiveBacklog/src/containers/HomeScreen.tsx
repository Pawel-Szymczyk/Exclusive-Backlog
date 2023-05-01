import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
import {useCommand} from '../commands/Command';
import {makeAutoObservable} from 'mobx';
import {IconButton} from 'react-native-paper';

interface Todo {
  id: number;
  title: string;
}

class TodoListStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = () => {
    const newTodo: Todo = {id: Date.now(), title: 'New Todo'};
    this.todos.push(newTodo);
  };

  undo = () => {
    // implement undo logic
  };

  redo = () => {
    // implement redo logic
  };
}

const todoListStore = new TodoListStore();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props);
  }

  render() {
    const {todos, addTodo, undo, redo} = todoListStore;
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
          <Text>Home Screen</Text>
          <Button
            title="Go to Settings"
            onPress={() => this.props.navigation.navigate('Settings')}
          />
          <Button
            title="Go to Create Backlog"
            onPress={() => this.props.navigation.navigate('CreateBacklog')}
          />

          <Button title="Add Todo" onPress={addTodo} />
          <Button title="Undo" onPress={undo} />
          <Button title="Redo" onPress={redo} />
          {todos.map(todo => (
            <Text key={todo.id}>{todo.title}</Text>
          ))}
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
