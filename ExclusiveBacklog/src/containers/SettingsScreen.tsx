import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackParamList} from '../App';

interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

export class SettingsScreen extends React.Component<SettingsScreenProps> {
  constructor(props: SettingsScreenProps) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Settings Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
