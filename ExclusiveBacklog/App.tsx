import React from 'react';
import Home from './src/views/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store';

// export type RootStackParamList = {
//   HomeView: Home;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeView" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
