import React from 'react';
import {StyleSheet, View} from 'react-native';
import useHomeBacklogViewController from '../viewcontrollers/useHomeBacklogViewController';
import {FAB, IconButton, Text} from 'react-native-paper';
import ListComponent from '../components/ListComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Status} from '../types/Status';
import QRCodeScannerComponent from '../components/QRCodeScannerComponent';

type HomeBacklogsProps = NativeStackScreenProps<RootStackParamList, 'HomeBacklogs'>;

const HomeBacklogsView = ({route, navigation}: HomeBacklogsProps) => {
  const {
    qrCodeScanner,
    setQRCodeScanner,
    status,
    backlogs,
    onPressBacklogItem,
    onPressCreate,
    onQRCodeScanned,
  } = useHomeBacklogViewController();

  const onPressQRCodeButton = () => {
    setQRCodeScanner(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <IconButton icon="qrcode-scan" size={20} onPress={onPressQRCodeButton} />
      </View>
      {(() => {
        switch (status) {
          case Status.LOADING:
            return (
              <View style={styles.contentContainer}>
                <Text>Loading...</Text>
              </View>
            );
          case Status.SUCCEEDED:
            return (
              <View style={styles.contentContainer}>
                {/* QR Code Scanner */}
                {qrCodeScanner && (
                  <QRCodeScannerComponent
                    isQrCodeScannerOpen={qrCodeScanner}
                    onQRCodeScanned={onQRCodeScanned}
                  />
                )}

                <ListComponent
                  onListItemPressEventHandler={onPressBacklogItem}
                  listItems={backlogs}
                  title="Backlogs"
                />
                <FAB icon="plus" style={styles.fab} onPress={onPressCreate} />
              </View>
            );
          default:
            return null;
        }
      })()}
    </View>
  );
};

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
    backgroundColor: '#f8f6f7',
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeBacklogsView;
