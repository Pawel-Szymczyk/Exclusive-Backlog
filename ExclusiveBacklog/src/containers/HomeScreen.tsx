import * as React from 'react';
import {View, Text, Button} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
import {useCommand} from '../commands/Command';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Create Backlog"
          onPress={() => this.props.navigation.navigate('CreateBacklog')}
        />
      </View>
    );
  }
}
