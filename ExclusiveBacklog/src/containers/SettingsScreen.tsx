import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

export interface HomeScreenProps {
  navigation: StackScreenProps<any, any>;
}

export class SettingsScreen extends React.Component<HomeScreenProps, object> {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}
