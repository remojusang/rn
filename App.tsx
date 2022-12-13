import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignScreen from './screens/SignScreen';
import { RootStackParamList } from './utils/types';

export const userContext = React.createContext(null);

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <userContext.Provider value={null}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '홈' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: '로그인' }}
          />
          <Stack.Screen
            name="Sign"
            component={SignScreen}
            options={{ title: '회원가입' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

export default App;
