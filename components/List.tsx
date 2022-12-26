import { useRef } from 'react';
import { FlatList, View } from 'react-native';

interface IFlatListConfig<T> {
  data: T[];
  renderItem: (props: any) => JSX.Element;
  keyExtractor: (item: any, index?: number) => string;
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
  const flatListRef = useRef<FlatList>(null);
  return (
    <FlatList
      ref={flatListRef}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
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

export default List;
