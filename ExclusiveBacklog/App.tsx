import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/app/store';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeBacklogsView from './src/views/HomeView';
import NewBacklogView from './src/views/NewBacklogView';
import BacklogView from './src/views/BacklogView';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import {SafeAreaView} from 'react-native-safe-area-context';
import UpdateBacklogView from './src/views/UpdateBacklogView';

registerTranslation('en-GB', enGB);

export type RootStackParamList = {
  HomeBacklogs: undefined;
  NewBacklog: undefined;
  UpdateBacklog: {
    id: string;
  };
  Backlog: {
    // backlog: IBacklog;
    name: string;
    id: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1}}>
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
                <Stack.Screen
                  name="UpdateBacklog"
                  component={UpdateBacklogView}
                  options={{title: 'Update Backlog'}}
                />
                <Stack.Screen name="Backlog" component={BacklogView} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaView>
      </Provider>
    );
  }
}
