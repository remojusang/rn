import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignScreen from '../screens/SignScreen';
import { RootStackParamList } from '../utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  screenName?: string;
}

export default function SharedStackNav({ screenName }: Props) {
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
          options={{ title: '홈' }}
        />
      )}
      {screenName === 'Login' && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: '로그인' }}
        />
      )}
      <Stack.Screen
        name="Sign"
        component={SignScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
