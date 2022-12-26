import { useRef, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import { RootStackParamList } from '../utils/types';
import { useForm } from 'react-hook-form';
import CustomBtn from '../components/CustomBtn';
import FormLayout from '../components/FormLayout';
import FlexGap from '../components/FlexGap';
import { isLoggedInState, userInfoState } from '../components/Atoms';
import { useSetRecoilState } from 'recoil';

export type LoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export interface ILoginForm {
  email: string;
  password: string;
}

function LoginScreen({ route, navigation }: LoginProps) {
  const { formState, handleSubmit, control, setValue } =
    useForm<ILoginForm>({
      mode: 'onChange',
    });
  useEffect(() => {
    if (route.params?.signedEmail) {
      setValue('email', route.params.signedEmail);
    }
  }, [navigation, route, setValue]);
  const setisLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const pwRef = useRef<TextInput>(null);
  const onValid = ({ email, password }: ILoginForm) => {
    if (email !== 'test123@naver.com' || password !== 'remo1234') {
      return;
    }
    setisLoggedIn(true);
    setUserInfo(prev => {
      return {
        ...prev,
        email,
      };
    });
    Alert.alert('알림', '로그인 완료.', [
      { text: 'OK', onPress: () => navigation.navigate('Profile') },
    ]);
    navigation.navigate('Profile');
  };
  return (
    <FormLayout>
      <>
        <FormInput
          name="email"
          errorMsg={formState.errors.email?.message}
          control={control}
          textInputConfig={{
            keyboardType: 'email-address',
            placeholder: 'remo@naver.com',
          }}
          onNext={() => pwRef.current?.focus()}
        />
        <FormInput
          name="password"
          errorMsg={formState.errors.password?.message}
          control={control}
          textInputConfig={{
            placeholder: '********',
            secureTextEntry: true,
          }}
          inputRef={pwRef}
        />
        <FlexGap gapSize={10} />
        <CustomBtn
          isLoading={false}
          title="loginBtn"
          onPress={handleSubmit(onValid)}
        />
        <FlexGap gapSize={10} />
        <CustomBtn
          isLoading={false}
          title="googleBtn"
          isGoogle
          onPress={handleSubmit(onValid)}
        />
        <View style={styles.divider} />
        <CustomBtn
          isLoading={false}
          title="signUpBtn"
          color="#6C6C6C"
          onPress={() => navigation.navigate('Sign')}
        />
      </>
    </FormLayout>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  gap: {
    marginVertical: 5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
});
