import { View, Image } from 'react-native';
import { AlbumImageType } from '../../utils/types';

function AlbumImage({ item }: { item: AlbumImageType }) {
  return (
    <View style={{ paddingBottom: 20 }}>
      <Image
        style={{
          height: 200,
          resizeMode: 'cover',
          borderRadius: 10,
        }}
        source={{ uri: item.uri as string }}
      />
    </View>
  );
}

export default AlbumImage;
