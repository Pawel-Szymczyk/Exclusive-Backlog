import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {RootStackParamList} from '../../App';
import useBacklogViewController from '../viewcontrollers/useBacklogViewController';
import {DataTable, Button} from 'react-native-paper';

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
      <View style={styles.imageContainer}>
        <Image
          style={{width: 'auto', height: 150}}
          source={{
            uri: 'https://cdn.thewirecutter.com/wp-content/media/2021/09/pens-2048px-6546-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
          }}
        />
      </View>
      <View style={styles.tableContainer}>
        <DataTable style={{}}>
          <DataTable.Row style={{backgroundColor: '#f4f3ee'}}>
            <DataTable.Title>Name:</DataTable.Title>
            <DataTable.Cell>{backlog?.name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Category:</DataTable.Title>
            <DataTable.Cell>{backlog?.category['name']}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{backgroundColor: '#f4f3ee'}}>
            <DataTable.Title>Price (£):</DataTable.Title>
            <DataTable.Cell>{backlog?.price}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Quantity:</DataTable.Title>
            <DataTable.Cell>{backlog?.quantity}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{backgroundColor: '#f4f3ee'}}>
            <DataTable.Title>Buy On:</DataTable.Title>
            <DataTable.Cell>{backlog?.buyOn}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Created On:</DataTable.Title>
            <DataTable.Cell>-</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{backgroundColor: '#f4f3ee'}}>
            <DataTable.Title>Modified On:</DataTable.Title>
            <DataTable.Cell>-</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={{paddingBottom: 5, paddingLeft: 30, paddingRight: 30}}>
        <Button
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.button}>
          Print QR Code
        </Button>
        <Button
          icon="pen"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.button}>
          Update
        </Button>

        <Button
          icon="delete"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.button}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,

    backgroundColor: '#fff',
  },
  imageContainer: {},
  tableContainer: {
    flex: 1,
  },

  button: {
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    marginBottom: 15,
  },
});

export default BacklogView;
