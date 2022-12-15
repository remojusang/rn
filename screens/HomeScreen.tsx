import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import ScreenLayout from '../components/ScreenLayout';
import PersonList from '../components/PersonList';
import LangSelector from '../components/LangSelector';
import { View } from 'react-native';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ route, navigation }: HomeProps) {
  return (
    <ScreenLayout isLoading={false}>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <LangSelector />
      </View>
      <PersonList isRefreshing={false} onRefresh={() => {}} />
    </ScreenLayout>
  );
}

export default HomeScreen;
