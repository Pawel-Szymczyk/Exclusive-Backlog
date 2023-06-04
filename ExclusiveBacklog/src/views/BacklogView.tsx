import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {RootStackParamList} from '../../App';
import useBacklogViewController from '../viewcontrollers/useBacklogViewController';
import {DataTable, Button} from 'react-native-paper';
import DialogComponent from '../components/DialogComponent';

type BacklogProps = NativeStackScreenProps<RootStackParamList, 'Backlog'>;

const BacklogView = ({route, navigation}: BacklogProps) => {
  // -------------------------------------------------------------------
  // controllers
  const {status, backlog, deleteDialogVisible, setDeleteDialogVisible, onAcceptDeleteClick} =
    useBacklogViewController();

  // -------------------------------------------------------------------
  // states
  // const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // -------------------------------------------------------------------
  // actions (TODO: move to controller)
  const onDeleteBacklog = () => {
    setDeleteDialogVisible(true);
  };

  const onDismissDeleteClick = () => {
    setDeleteDialogVisible(false);
  };

  // const onAcceptDeleteClick = () => {
  //   setDeleteDialogVisible(false);
  // };

  // -------------------------------------------------------------------
  // effects
  React.useEffect(() => {
    navigation.setOptions({
      title: route.name,
    });
  }, [navigation]);

  // -------------------------------------------------------------------
  // view
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          style={{width: 'auto', height: 150}}
          source={{
            uri: 'https://cdn.thewirecutter.com/wp-content/media/2021/09/pens-2048px-6546-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2',
          }}
        />
      </View>
      <View style={style.tableContainer}>
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
          onPress={() => console.log('Print QR Code')}
          style={style.button}>
          Print QR Code
        </Button>
        <Button
          icon="pen"
          mode="contained"
          onPress={() => console.log('Update')}
          style={style.button}>
          Update
        </Button>

        <Button icon="delete" mode="contained" onPress={onDeleteBacklog} style={style.deleteButton}>
          Delete
        </Button>
      </View>

      <DialogComponent
        visible={deleteDialogVisible}
        title="Delete Backlog"
        message="Are you sure you want to permanently DELETE this backlog?"
        onAcceptTitle="Delete"
        onDismissTitle="Cancel"
        onAccept={onAcceptDeleteClick}
        onDismiss={onDismissDeleteClick}
      />
    </View>
  );
};

// -------------------------------------------------------------------
// styles (TODO: move to style file)
const style = StyleSheet.create({
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

  deleteButton: {
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    marginBottom: 15,
    backgroundColor: '#BA1B23',
  },
});

export default BacklogView;
