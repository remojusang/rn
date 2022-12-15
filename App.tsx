import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './utils/types';
import BottomNav from './components/BottomNav';
import { IntlProvider } from 'react-intl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import enUsMsg from './lang/en-US.json';
import koMsg from './lang/ko.json';
import zhMsg from './lang/zh.json';
import {
  UserProvider,
  useUserDispatch,
} from './components/UserContext';

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [locale, setLocale] = useState('ko');
  const dispatch = useUserDispatch();
  const getLocale = async () => {
    const res = (await AsyncStorage.getItem('locale')) ?? 'ko';
    setLocale(res);
    dispatch({ type: 'SET_LOCALE', locale: res });
  };
  useEffect(() => {
    (async () => {
      await getLocale();
    })();
  }, []);
  const messages = { 'en-US': enUsMsg, ko: koMsg, zh: zhMsg }[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <UserProvider>
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
      </UserProvider>
    </IntlProvider>
  );
}

export default App;
