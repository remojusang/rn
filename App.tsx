import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './utils/types';
import BottomNav from './components/BottomNav';

export const userContext = React.createContext(null);

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <userContext.Provider value={null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            options={{
              headerShown: false,
            }}
            component={BottomNav}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

export default App;
