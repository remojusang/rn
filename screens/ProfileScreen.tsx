import ScreenLayout from '../components/ScreenLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Alert } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { Pressable } from 'react-native';
import TabIcon from '../components/TabIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfoState } from '../components/Atoms';
import { signOut } from '../utils/auth';

type DetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

function ProfileScreen({}: DetailProps) {
  const userInfo = useRecoilValue(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const handlePress = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUserInfo(null);
    Alert.alert('Notification', '로그아웃 완료.', [{ text: 'OK' }]);
  };
  return (
    <ScreenLayout isLoading={false}>
      <Text style={{ color: '#fff', fontSize: 20 }}>
        email: {'\n'}
        {userInfo?.email}
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
