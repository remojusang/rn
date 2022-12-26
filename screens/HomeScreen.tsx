import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import ScreenLayout from '../components/ScreenLayout';
import PersonList from '../components/List';
import LangSelector from '../components/LangSelector';
import { View } from 'react-native';
import { PersonType } from '../utils/types';
import Person from '../components/ListItem/Person';
import { personDataState } from '../components/Atoms';
import FloatingBtn from '../components/FloatingBtn';
import { useRecoilState } from 'recoil';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({}: HomeProps) {
  const personData = useRecoilState(personDataState);
  return (
    <ScreenLayout isLoading={false}>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <LangSelector />
      </View>
      <PersonList
        isRefreshing={false}
        onRefresh={() => {}}
        flatListConfig={{
          data: personData[0] as PersonType[],
          renderItem: props => <Person {...props} />,
          keyExtractor: item => item.name,
        }}
      />
      <FloatingBtn />
    </ScreenLayout>
  );
}

export default HomeScreen;
