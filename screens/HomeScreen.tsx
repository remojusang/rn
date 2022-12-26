import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import ScreenLayout from '../components/ScreenLayout';
import PersonList from '../components/List';
import LangSelector from '../components/LangSelector';
import { View } from 'react-native';
import { PersonType } from '../utils/types';
import Person from '../components/ListItem/Person';
import personData from '../utils/personData.json';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({}: HomeProps) {
  return (
    <ScreenLayout isLoading={false}>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <LangSelector />
      </View>
      <PersonList
        isRefreshing={false}
        onRefresh={() => {}}
        flatListConfig={{
          data: personData as PersonType[],
          renderItem: props => <Person {...props} />,
          keyExtractor: item => item.name,
        }}
      />
    </ScreenLayout>
  );
}

export default HomeScreen;
