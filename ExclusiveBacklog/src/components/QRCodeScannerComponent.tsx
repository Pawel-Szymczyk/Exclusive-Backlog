import React, {useState, useEffect} from 'react';
import {Image, Text, View, StyleSheet, Button, Modal} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import {IQRCodeScanner} from '../features/backlog/Backlog';

interface QRCodeScannerComponentProps {
  isQrCodeScannerOpen: boolean;
  onQRCodeScanned: (qrCodeScanner: IQRCodeScanner) => void;
  setQRScannerVisible: () => void;
}

const QRCodeScannerComponent = (props: QRCodeScannerComponentProps) => {
  const {isQrCodeScannerOpen, onQRCodeScanned, setQRScannerVisible} = props;

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleQRCodeScanned = ({type, data}: BarCodeScannerResult) => {
    setScanned(true);

    // read and return receive data.
    const qrCodeData = JSON.parse(data) as IQRCodeScanner;
    onQRCodeScanned(qrCodeData);
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
      visible={isQrCodeScannerOpen}
      onRequestClose={() => {
        setQRScannerVisible();
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}>
          {/* <Text style={styles.description}>Scan your QR code</Text> */}
          <Image style={styles.qr} source={require('../../assets/qr-scanner.png')} />
          <Text onPress={() => alert('Navigate back from here')} style={styles.cancel}>
            Cancel
          </Text>
        </BarCodeScanner>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
