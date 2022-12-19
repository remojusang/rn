import React, { useEffect } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { RootStackParamList } from '../utils/types';

type DetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

function DetailScreen({ route, navigation }: DetailProps) {
  useEffect(() => {
    if (route.params?.name) {
      navigation.setOptions({
        title: route.params.name,
      });
    }
  }, [navigation, route]);
  return (
    <ScreenLayout isLoading={false}>
      <Text>name: {route?.params?.name}</Text>
      <Text>age: {route?.params?.age}</Text>
      <Text>gender: {route?.params?.gender}</Text>
    </ScreenLayout>
  );
}

export default DetailScreen;
