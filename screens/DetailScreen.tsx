import React, { useEffect } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { Pressable } from 'react-native';
import TabIcon from '../components/TabIcon';
import { useSetRecoilState } from 'recoil';
import { personDataState } from '../components/Atoms';

type DetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

function DetailScreen({ route, navigation }: DetailProps) {
  const setPersonData = useSetRecoilState(personDataState);
  useEffect(() => {
    if (route.params?.name) {
      navigation.setOptions({
        title: route.params.name,
      });
    }
  }, [navigation, route]);
  const handlePress = () => {
    setPersonData(prev =>
      prev.filter(({ name }) => route.params.name !== name),
    );
    navigation.navigate('Home');
  };
  return (
    <ScreenLayout isLoading={false}>
      <Text>name: {route?.params?.name}</Text>
      <Text>age: {route?.params?.age}</Text>
      <Text>gender: {route?.params?.gender}</Text>
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
        }}
        onPress={handlePress}>
        <TabIcon name="trash" color="red" size={40} isFocused />
      </Pressable>
    </ScreenLayout>
  );
}

export default DetailScreen;
