import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

type GreetingsProps = {
  name: string;
};

const Greeting = (props: GreetingsProps) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}</Text>
    </View>
  );
};

const HelloWorldApp = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Pawel" />
      <Greeting name="Robert" />
      <Greeting name="Lukasz" />
    </View>
  );
};

export default HelloWorldApp;
