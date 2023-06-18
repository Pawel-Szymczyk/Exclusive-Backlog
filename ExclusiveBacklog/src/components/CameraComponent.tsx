import {View, StyleSheet, TouchableOpacity, Modal, Dimensions, SafeAreaView} from 'react-native';
import {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {Camera, CameraType} from 'expo-camera';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

interface CameraComponentProps {
  isCameraOpen: boolean;
  onTakePhoto: (base64Picture: string) => void;
  setCameraVisible: () => void;
}

const CameraComponent = (props: CameraComponentProps) => {
  const {isCameraOpen, setCameraVisible, onTakePhoto} = props;

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  // const cameraRef = useRef();
  const [cameraRef, setCameraRef] = useState<Camera | null>();
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true, skipProcessing: true};
      const data = await cameraRef.takePictureAsync(options);
      const base64 = data.base64?.replaceAll(' ', '+');

      if (base64) {
        setPhoto(base64);
        await cameraRef.pausePreview();
        setIsPreview(true);
      }
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

  const cancelPreview = async () => {
    if (cameraRef) {
      setPhoto('');
      await cameraRef.resumePreview();
      setIsPreview(false);
    }
  };

  const savePreview = async () => {
    console.log(photo);
    if (cameraRef) {
      await cameraRef.resumePreview();
      setIsPreview(false);

      if (photo) {
        onTakePhoto(photo);
      }
    }
  };

  const renderControlPreviewButtons = () => (
    <View style={styles.previewControls}>
      <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
        <View style={[styles.closeCross, {transform: [{rotate: '45deg'}]}]} />
        <View style={[styles.closeCross, {transform: [{rotate: '-45deg'}]}]} />
      </TouchableOpacity>
      <Button icon="content-save" mode="elevated" onPress={savePreview} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{'Flip'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCameraOpen}
      onRequestClose={setCameraVisible}>
      <SafeAreaView style={styles.container}>
        <Camera
          ref={ref => {
            setCameraRef(ref);
          }}
          style={styles.container}
          type={cameraType}
          onCameraReady={onCameraReady}
          onMountError={error => {
            console.log('cammera error', error);
          }}
        />
        <View style={styles.container}>
          {isPreview && renderControlPreviewButtons()}
          {!isPreview && renderCaptureControl()}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  previewControls: {
    width: 21,
    height: 23,
    marginTop: 7,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    zIndex: 2,
  },
  saveButton: {
    height: 40,
    width: 100,
    top: 35,
    left: 300,
    rippleColor: '#c4c5c4',
    textColor: '#fff',
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black',
  },
  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#f5f6f5',
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: '#ff0000',
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
  },
});

//   const [hasPermission, setHasPermission] = useState<boolean>();
//   const [type, setType] = useState(CameraType.back);
//   const [cameraRef, setCameraRef] = useState<Camera | null>();

//   useEffect(() => {
//     (async () => {
//       const {status} = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const onTakePhoto = async () => {
//     if (cameraRef) {
//       const options = {quality: 0.9, base64: true, skipProcessing: true};
//       let photo = await cameraRef.takePictureAsync(options);
//       const base64 = photo.base64?.replaceAll(' ', '+');
//       // console.log(base64);
//       // setImage(photo);
//       // setModalVisible();
//     }
//   };
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={true}
//       onRequestClose={() => {
//         setModalVisible();
//       }}>
//       <View style={styles.container}>
//         <Camera
//           style={styles.camera}
//           type={type}
//           ratio="16:9"
//           ref={ref => {
//             setCameraRef(ref);
//           }}>
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: 'transparent',
//               justifyContent: 'flex-end',
//             }}>
//             <View
//               style={{
//                 backgroundColor: 'black',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <Button
//                 icon="close"
//                 style={{marginLeft: 12}}
//                 mode="outlined"
//                 color="white"
//                 onPress={() => {
//                   props.setModalVisible();
//                 }}>
//                 Close
//               </Button>
//               <TouchableOpacity
//                 onPress={onTakePhoto}
//                 // onPress={async () => {
//                 //   if (cameraRef) {
//                 //     let photo = await cameraRef.takePictureAsync();
//                 //     // setImage(photo);
//                 //     // setModalVisible();
//                 //   }
//                 // }}
//               >
//                 <View
//                   style={{
//                     borderWidth: 2,
//                     borderRadius: 50,
//                     borderColor: 'white',
//                     height: 50,
//                     width: 50,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: 16,
//                     marginTop: 16,
//                   }}>
//                   <View
//                     style={{
//                       borderWidth: 2,
//                       borderRadius: 50,
//                       borderColor: 'white',
//                       height: 40,
//                       width: 40,
//                       backgroundColor: 'white',
//                     }}></View>
//                 </View>
//               </TouchableOpacity>
//               {/* <Button
//                 icon="axis-z-rotate-clockwise"
//                 style={{marginRight: 12}}
//                 mode="outlined"
//                 color="white"
//                 onPress={() => {
//                   setType(
//                     type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back,
//                   );
//                 }}>
//                 {type === Camera.Constants.Type.back ? 'Front' : 'Back '}
//               </Button> */}
//             </View>
//           </View>
//         </Camera>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'flex-end',
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
// });

export default CameraComponent;
