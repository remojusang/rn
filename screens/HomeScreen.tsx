import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RootStackParamList, PersonType } from '../utils/types';
import { userContext } from '../App';
import personData from '../utils/personData.json';
import Person from '../components/Person';
import ScreenLayout from '../components/ScreenLayout';

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
      <FlatList
        style={{ width: '100%' }}
        data={personData as PersonType[]}
        renderItem={props => <Person {...props} />}
        keyExtractor={item => item.name}
      />
    </ScreenLayout>
  );
}

export default HomeScreen;
