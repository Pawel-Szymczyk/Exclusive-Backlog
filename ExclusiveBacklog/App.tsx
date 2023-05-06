import React from 'react';
import Home from './src/views/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeView: Home;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeView" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
