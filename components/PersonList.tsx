import React from 'react';
import { FlatList, View } from 'react-native';
import { PersonType } from '../utils/types';
import Person from './Person';
import personData from '../utils/personData.json';

interface Props {
  isRefreshing: boolean;
  onRefresh: () => void;
}
function PersonList({ isRefreshing, onRefresh }: Props) {
  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'yellow',
            marginVertical: 10,
          }}></View>
      )}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      style={{ width: '100%' }}
      data={personData as PersonType[]}
      renderItem={props => <Person {...props} />}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default PersonList;
