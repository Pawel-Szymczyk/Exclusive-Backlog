import React from 'react';
import {View, Text} from 'react-native';
// import {NavigationScreenProp} from 'react-navigation';
import {StackScreenProps} from '@react-navigation/stack';

export interface HomeScreenProps {
  navigation: StackScreenProps<any>;
}

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        {/* <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('Details')}
            /> */}
      </View>
    );
  }
}
