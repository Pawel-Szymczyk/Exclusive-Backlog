import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeBacklogsView from './src/views/HomeView';
import NewBacklogView from './src/views/NewBacklogView';
import BacklogView from './src/views/BacklogView';
import {BacklogType} from './src/types/BacklogType';

export type RootStackParamList = {
  HomeBacklogs: undefined;
  NewBacklog: undefined;
  Backlog: {
    backlog: BacklogType;
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
              <Stack.Screen
                name="HomeBacklogs"
                component={HomeBacklogsView}
                options={{title: 'Home'}}
              />
              <Stack.Screen
                name="NewBacklog"
                component={NewBacklogView}
                options={{title: 'New Backlog'}}
              />
              <Stack.Screen name="Backlog" component={BacklogView} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
