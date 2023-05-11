import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeBacklogsView from './src/views/HomeView';
import NewBacklogView from './src/views/NewBacklogView';

export type RootStackParamList = {
  HomeBacklogs: undefined;
  NewBacklog: undefined;
  Backlog: {
    backlogId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomeBacklogs" component={HomeBacklogsView} />
              <Stack.Screen name="NewBacklog" component={NewBacklogView} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
