import React from 'react';
import {StyleSheet, View} from 'react-native';
import useHomeBacklogViewController from '../viewcontrollers/useHomeBacklogViewController';
import {FAB, IconButton, Snackbar, Text} from 'react-native-paper';
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
    onPressExportToXmlButton,
    onPressExportQRCodesButton,
  } = useHomeBacklogViewController();

  const onPressQRCodeButton = () => {
    setQRCodeScanner(true);
  };

  // --------------------------------------------------------
  // FAB Group

  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: any) => setState({open});

  const {open} = state;

  // --------------------------------------------------------

  // --------------------------------------------------------
  // Snackbar (status message popup)

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const onDismissSnackBar = () => setVisibleSnackBar(false);

  // --------------------------------------------------------

  return (
    <View style={styles.container}>
      {/* TODO: This section will be for search feature */}
      {/* <View style={styles.navigationContainer}>
        <IconButton icon="export" size={20} onPress={onPressQRCodeButton} />
        <IconButton icon="xml" size={20} onPress={onPressQRCodeButton} />
        <IconButton icon="qrcode-scan" size={20} onPress={onPressQRCodeButton} />
      </View> */}

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
                    setQRScannerVisible={() => setQRCodeScanner(false)}
                  />
                )}

                <ListComponent
                  onListItemPressEventHandler={onPressBacklogItem}
                  listItems={backlogs}
                  title="Backlogs"
                />
                {/* <FAB icon="plus" style={styles.fab} onPress={onPressCreate} /> */}

                <FAB.Group
                  open={open}
                  visible
                  icon={open ? 'plus' : 'menu'}
                  actions={[
                    {
                      icon: 'cog-outline',
                      label: 'Settings',
                      onPress: () => console.log('settings'),
                    },
                    {
                      icon: 'xml',
                      label: 'Export to XML',
                      onPress: async () => {
                        const message = await onPressExportToXmlButton();
                        setMessageSnackBar(message);
                        setVisibleSnackBar(!visibleSnackBar);
                      },
                    },
                    {
                      icon: 'export',
                      label: 'Export QR Codes',
                      onPress: async () => {
                        const message = await onPressExportQRCodesButton();
                        setMessageSnackBar(message);
                        setVisibleSnackBar(!visibleSnackBar);
                      },
                    },
                    {
                      icon: 'folder-outline',
                      label: 'Export QR Codes By Cat.',
                      onPress: async () => {
                        // const message = await onPressExportQRCodesButton();
                        // setMessageSnackBar(message);
                        // setVisibleSnackBar(!visibleSnackBar);
                      },
                    },
                    {
                      icon: 'qrcode-scan',
                      label: 'Scan QR Code',
                      onPress: () => onPressQRCodeButton(),
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                      // add new backlog...
                      onPressCreate();
                    }
                  }}
                />
              </View>
            );
          default:
            return null;
        }
      })()}

      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
        }}>
        {messageSnackBar}
      </Snackbar>
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
