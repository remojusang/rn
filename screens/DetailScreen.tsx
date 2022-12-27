import { useEffect, useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);
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
  const onRefresh = () => {
    setRefreshing(true);
    // refetch()
    setRefreshing(false);
  };
  return (
    <ScreenLayout isLoading={false}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          width: '100%',
          backgroundColor: 'gray',
        }}>
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
      </ScrollView>
    </ScreenLayout>
  );
}

export default DetailScreen;
