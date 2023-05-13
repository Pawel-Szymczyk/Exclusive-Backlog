import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import useNewBacklogViewController from '../viewcontrollers/useNewBacklogViewController';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NewBacklogProps = NativeStackScreenProps<RootStackParamList, 'NewBacklog'>;

const NewBacklogView = ({route, navigation}: NewBacklogProps) => {
  const {formState, creatingBacklog, onChangeText, onFormSubmit} =
    useNewBacklogViewController();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="camera"
          mode="text"
          onPress={onFormSubmit}
          disabled={creatingBacklog}>
          Save
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={formState.name}
        onChangeText={(text: string) => onChangeText('name', text)}
        mode="outlined"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default NewBacklogView;
