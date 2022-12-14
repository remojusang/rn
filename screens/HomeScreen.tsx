import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { userContext } from '../App';
import ScreenLayout from '../components/ScreenLayout';
import PersonList from '../components/PersonList';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ route, navigation }: HomeProps) {
  const userInfo = React.useContext(userContext);
  return (
    <ScreenLayout isLoading={false}>
      <PersonList isRefreshing={false} onRefresh={() => {}} />
    </ScreenLayout>
  );
}

export default HomeScreen;
