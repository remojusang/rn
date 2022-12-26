import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();

interface Props {
  name: string;
  color: string;
  isFocused: boolean;
  size?: number;
}
// RN 0.6버젼 이상일때 react-native-vector-icons 에러 해결법
// https://stackoverflow.com/questions/38713240/unrecognized-font-family-ionicons
function TabIcon({ name, color, isFocused, size = 24 }: Props) {
  return (
    <Icon
      name={isFocused ? name : `${name}-outline`}
      color={color}
      size={size}
    />
  );
}

export default TabIcon;
