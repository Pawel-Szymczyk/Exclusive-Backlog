import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {RootStackParamList} from '../../App';

type BacklogProps = NativeStackScreenProps<RootStackParamList, 'Backlog'>;

const BacklogView = ({route, navigation}: BacklogProps) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.backlog.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default BacklogView;
