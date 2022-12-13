import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, PersonType } from '../utils/types';
import { userContext } from '../App';
import ScreenLayout from '../components/ScreenLayout';
import PersonList from '../components/PersonList';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ route, navigation }: HomeProps) {
  const userInfo = React.useContext(userContext);
  return (
    <ScreenLayout isLoading={false}>
      {/* <Text>Home</Text>
      <View>
        <Text onPress={() => navigation.navigate('Login')}>
          로그인
        </Text>
      </View>
      <View>
        <Text onPress={() => navigation.navigate('Sign')}>
          회원가입
        </Text>
      </View> */}
      <PersonList isRefreshing={false} onRefresh={() => {}} />
    </ScreenLayout>
  );
}

export default HomeScreen;
