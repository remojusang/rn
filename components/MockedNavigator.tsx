import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MockedNavigator = ({ component }: any) => {
  const Stack = createNativeStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MockedScreen" component={component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;
