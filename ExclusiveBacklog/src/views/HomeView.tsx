import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Home extends React.Component {
  buttonPressed(): void {
    console.log('Button pressed');
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text>THIS IS HOME SCREEN</Text>
        <StatusBar style="auto" />
        <Button
          onPress={this.buttonPressed}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
