import React from 'react';
import { Pressable } from 'react-native';
import TabIcon from './TabIcon';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_HINT } from '../utils/constants';

function FloatingBtn() {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('PersonForm');
  };
  return (
    <Pressable
      accessibilityHint={ACCESS_HINT.FLOATING_BTN}
      style={{
        backgroundColor: '#82C3EC',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
      }}
      onPress={handlePress}>
      <TabIcon name="add" color="#fff" size={50} isFocused />
    </Pressable>
  );
}

export default FloatingBtn;
