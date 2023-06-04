import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {Camera, CameraType} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

interface CameraComponentProps {
  showModal: boolean;
  setModalVisible: () => void;
}

const CameraComponent = (props: CameraComponentProps) => {
  const {showModal, setModalVisible} = props;

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState<Camera | null>();

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ratio="16:9"
          ref={ref => {
            setCameraRef(ref);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: 'black',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                icon="close"
                style={{marginLeft: 12}}
                mode="outlined"
                color="white"
                onPress={() => {
                  props.setModalVisible();
                }}>
                Close
              </Button>
              <TouchableOpacity
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    // setImage(photo);
                    // setModalVisible();
                  }
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 50,
                    width: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                    marginTop: 16,
                  }}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 50,
                      borderColor: 'white',
                      height: 40,
                      width: 40,
                      backgroundColor: 'white',
                    }}></View>
                </View>
              </TouchableOpacity>
              {/* <Button
                icon="axis-z-rotate-clockwise"
                style={{marginRight: 12}}
                mode="outlined"
                color="white"
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}>
                {type === Camera.Constants.Type.back ? 'Front' : 'Back '}
              </Button> */}
            </View>
          </View>
        </Camera>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraComponent;
