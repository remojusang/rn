import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignScreen from '../screens/SignScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PersonForm from '../screens/PersonForm';
import { RootStackParamList } from '../utils/types';
import { useIntl } from 'react-intl';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  screenName?: string;
}

export default function SharedStackNav({ screenName }: Props) {
  const { formatMessage } = useIntl();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
        },
      }}>
      {screenName === 'Home' && (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: formatMessage({ id: 'home' }) }}
        />
      )}
      {screenName === 'Login' && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: formatMessage({ id: 'loginBtn' }) }}
        />
      )}
      {screenName === 'Camera' && (
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: formatMessage({ id: 'camera' }) }}
        />
      )}
      {screenName === 'Profile' && (
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: formatMessage({ id: 'profile' }) }}
        />
      )}
      <Stack.Screen
        name="PersonForm"
        component={PersonForm}
        options={{
          title: formatMessage({ id: 'personAdd' }),
        }}
      />
      <Stack.Screen
        name="Sign"
        component={SignScreen}
        options={{ title: formatMessage({ id: 'signUpBtn' }) }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
