import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './utils/types';
import BottomNav from './components/BottomNav';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import enUsMsg from './lang/en-US.json';
import koMsg from './lang/ko.json';
import jpMsg from './lang/jp.json';
import { localeState } from './components/Atoms';
import { useRecoilValue } from 'recoil';

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const locale = useRecoilValue(localeState);
  const messages = { 'en-US': enUsMsg, ko: koMsg, jp: jpMsg }[locale];
  const handleError = (e: any) => {
    if ((e.code = ReactIntlErrorCode.MISSING_DATA)) {
      return;
    }
    console.error(e);
  };
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={handleError}>
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
    </IntlProvider>
  );
}

export default App;
