import { View } from 'react-native';

interface Props {
  isHorizontal?: boolean;
  gapSize?: number;
}

function FlexGap({ isHorizontal = false, gapSize = 20 }: Props) {
  return isHorizontal ? (
    <View style={{ marginLeft: gapSize }} />
  ) : (
    <View style={{ marginBottom: gapSize }} />
  );
}

export default FlexGap;
