import React, {useState, useEffect} from 'react';
import {Image, Text, View, StyleSheet, Button, Modal} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';

interface QRCodeScannerComponentProps {
  showModal: boolean;
  setModalVisible: () => void;
}

const QRCodeScannerComponent = (props: QRCodeScannerComponentProps) => {
  const {showModal, setModalVisible} = props;

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission.</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}>
          <Text style={styles.description}>Scan your QR code</Text>
          <Image
            style={styles.qr}
            source={
              require('../../assets/qr-scanner.png')
              //     {
              // //   uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
              // }
            }
          />
          <Text onPress={() => alert('Navigate back from here')} style={styles.cancel}>
            Cancel
          </Text>
        </BarCodeScanner>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        {/* <Text>Hello</Text> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: 300,
    height: 300,
  },
  description: {
    fontSize: 12 * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: 12 * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});

export default QRCodeScannerComponent;
