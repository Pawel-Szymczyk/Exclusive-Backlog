import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {HomeScreen} from './containers/HomeScreen';
import {SettingsScreen} from './containers/SettingsScreen';
import {CreateBacklogScreen} from './containers/CreateBacklogScreen';
import {HomeScreen} from './views/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  CreateBacklog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  render() {
    return (
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Home" component={HomeScreen} />
      //     <Stack.Screen name="CreateBacklog" component={CreateBacklogScreen} />
      //     <Stack.Screen name="Settings" component={SettingsScreen} />
      //   </Stack.Navigator>
      // </NavigationContainer>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
