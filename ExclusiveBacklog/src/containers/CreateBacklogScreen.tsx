import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {observer} from 'mobx-react';
import {useCommand} from '../commands/Command';
import {IconButton} from 'react-native-paper';

interface CreateBacklogScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateBacklog'>;
}

@observer
export class CreateBacklogScreen extends React.Component<CreateBacklogScreenProps> {
  constructor(props: CreateBacklogScreenProps) {
    super(props);
  }

  render() {
    return (
      //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      //     <Text>Home Screen</Text>
      //     <Button
      //       title="Go to Home"
      //       onPress={() => this.props.navigation.navigate('Home')}
      //     />
      //   </View>
      <View style={styles.container}>
        <View style={styles.navigationContainer}>
          <IconButton
            icon="qr-code-scanner"
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View style={styles.contentContainer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  contentContainer: {
    flex: 9,
    backgroundColor: 'steelblue',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
