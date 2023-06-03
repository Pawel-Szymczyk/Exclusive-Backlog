import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {RootStackParamList} from '../../App';
import useBacklogViewController from '../viewcontrollers/useBacklogViewController';

type BacklogProps = NativeStackScreenProps<RootStackParamList, 'Backlog'>;

const BacklogView = ({route, navigation}: BacklogProps) => {
  // const {backlogById, fetchBacklogById} = useBacklogViewController();
  const {status, backlog} = useBacklogViewController();

  // const [backlog, setBacklog] = useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      title: route.name,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>{backlog?.name}</Text>
      <Text>{backlog?.price}</Text>
      <Text>{backlog?.category['name']}</Text>
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
