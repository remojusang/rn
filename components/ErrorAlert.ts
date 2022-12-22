import { Alert } from 'react-native';

function ErrorAlert(errMsg: string) {
  return Alert.alert('Error', errMsg, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'OK' },
  ]);
}

export default ErrorAlert;
