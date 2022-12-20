import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  name: string;
  color: string;
  isFocused: boolean;
}
// RN 0.6버젼 이상일때 react-native-vector-icons 에러 해결법
// https://stackoverflow.com/questions/38713240/unrecognized-font-family-ionicons
function TabIcon({ name, color, isFocused }: Props) {
  return (
    <Icon
      name={isFocused ? name : `${name}-outline`}
      color={color}
      size={24}
    />
  );
}

export default TabIcon;
