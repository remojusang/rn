import React from 'react';
import { FlatList } from 'react-native';
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
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      style={{ width: '100%' }}
      data={personData as PersonType[]}
      renderItem={props => <Person {...props} />}
      keyExtractor={item => item.name}
    />
  );
}

export default PersonList;
