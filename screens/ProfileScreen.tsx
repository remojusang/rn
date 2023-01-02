import ScreenLayout from '../components/ScreenLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Alert } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { Pressable } from 'react-native';
import TabIcon from '../components/TabIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, uidState } from '../components/Atoms';
import { signOut } from '../utils/firebase/auth';
import { IProfile, getProfile } from '../utils/firebase/users';
import { useEffect, useState } from 'react';

type DetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

function ProfileScreen({}: DetailProps) {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const uid = useRecoilValue(uidState) as string;
  useEffect(() => {
    getProfile(uid).then(setProfile);
  }, []);
  const handlePress = async () => {
    await signOut();
    setIsLoggedIn(false);
    Alert.alert('Notification', '로그아웃 완료.', [{ text: 'OK' }]);
  };
  return (
    <ScreenLayout isLoading={false}>
      <Text style={{ color: '#fff', fontSize: 20 }}>
        {profile?.uid}
      </Text>
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
        }}
        onPress={handlePress}>
        <TabIcon name="log-out" color="#fff" size={40} isFocused />
      </Pressable>
    </ScreenLayout>
  );
}

export default ProfileScreen;
