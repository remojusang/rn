import React from 'react';
import { Pressable } from 'react-native';
import TabIcon from './TabIcon';
import { useSetRecoilState } from 'recoil';
import { personDataState } from '../components/Atoms';

function FloatingBtn() {
  const setPersonData = useSetRecoilState(personDataState);
  const handlePress = () => {
    // 샘플데이터 추가
    setPersonData(prev => [
      ...prev,
      { name: `Test${new Date()}`, age: 80, gender: 'male' },
    ]);
  };
  return (
    <Pressable
      style={{
        backgroundColor: '#fff',
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
      <TabIcon name="add" color="#000" isFocused />
    </Pressable>
  );
}

export default FloatingBtn;
