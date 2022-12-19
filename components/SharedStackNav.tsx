import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignScreen from '../screens/SignScreen';
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
      <Stack.Screen
        name="Sign"
        component={SignScreen}
        options={{ title: formatMessage({ id: 'signUpBtn' }) }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
