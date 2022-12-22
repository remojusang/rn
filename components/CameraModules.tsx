import { useState } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import CustomBtn from './CustomBtn';
import {
  PermissionsAndroid,
  Platform,
  Image,
  View,
} from 'react-native';
import ErrorAlert from './ErrorAlert';
import { CAMERA_ERRCODE } from '../utils/constants';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

function CameraModules() {
  const [cameraLoading, setCameraLoading] = useState(false);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [preview, setPreview] = useState<Asset[] | null | undefined>(
    null,
  );
  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    // cameraType: 'back',
    // saveToPhotos: true,
  };
  const albumOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 0,
    presentationStyle: 'popover',
  };
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '외부저장소 쓰기 허용권한',
          message: '외부저장소 쓰기 허용권한을 수락하시겠습니까?',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the externalStorage');
      } else {
        console.log('externalStorage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleCameraPress = async () => {
    let res;
    setCameraLoading(true);
    try {
      res = await request(PERMISSIONS.IOS.CAMERA);
      console.log('res', typeof res);
    } catch (error) {
      console.log(error);
    }
    if (res !== 'granted') {
      return;
    }

    if (Platform.OS === 'android') {
      await requestExternalStoragePermission();
    }
    const { didCancel, errorCode, errorMessage, assets } =
      await launchCamera(cameraOptions);
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
    setCameraLoading(false);
  };
  const handleAlbumPress = async () => {
    setAlbumLoading(true);
    const { didCancel, errorCode, errorMessage, assets } =
      await launchImageLibrary(albumOptions);
    if (didCancel) {
      setAlbumLoading(false);
      return;
    }
    if (errorCode === 'others') {
      errorMessage && ErrorAlert(errorMessage);
    } else {
      errorCode && ErrorAlert(CAMERA_ERRCODE[errorCode]);
    }
    if (assets) {
      setPreview(assets);
    }
    setAlbumLoading(false);
  };

  return (
    <View style={{ width: '100%' }}>
      <CustomBtn
        isLoading={cameraLoading}
        onPress={handleCameraPress}
        title="Launch Camera"
        color="#852999"
      />
      <View style={{ marginBottom: 20 }} />
      <CustomBtn
        isLoading={albumLoading}
        onPress={handleAlbumPress}
        title="Open Album"
        color="#BA94D1"
      />
      <View style={{ marginBottom: 20 }} />
      {preview && (
        <ScrollView>
          {preview.map(({ uri }, idx) => (
            <View key={idx} style={{ paddingBottom: 20 }}>
              <Image
                style={{
                  height: 200,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
                source={{ uri: uri as string }}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default CameraModules;
