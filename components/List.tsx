import React from 'react';
import { FlatList, View } from 'react-native';

interface IFlatListConfig<T> {
  data: T[];
  renderItem: (props: any) => JSX.Element;
  keyExtractor: (item: any) => string;
}

interface Props<T> {
  isRefreshing: boolean;
  onRefresh: () => void;
  flatListConfig: IFlatListConfig<T>;
}

function List<T>({
  isRefreshing,
  onRefresh,
  flatListConfig,
}: Props<T>) {
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
      data={flatListConfig.data}
      renderItem={flatListConfig.renderItem}
      keyExtractor={flatListConfig.keyExtractor}
    />
  );
}
//personData as PersonType[]
//props => <Person {...props} />
//item => item.name
export default List;
