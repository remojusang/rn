import React, { useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, TextInput } from 'react-native';
import FormInput from '../components/FormInput';
import { RootStackParamList } from '../utils/types';
import { useForm } from 'react-hook-form';
import CustomBtn from '../components/CustomBtn';
import FormLayout from '../components/FormLayout';

export type LoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export interface ILoginForm {
  email: string;
  password: string;
}

function LoginScreen({ route, navigation }: LoginProps) {
  const pwRef = useRef<TextInput>(null);
  const { formState, handleSubmit, control } = useForm<ILoginForm>({
    mode: 'onChange',
  });
  const onValid = (form: ILoginForm) => {
    console.log('form', form);
    //navigation.navigate("Home");
  };
  return (
    <FormLayout>
      <>
        <FormInput
          label="이메일"
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
          label="비밀번호"
          name="password"
          errorMsg={formState.errors.password?.message}
          control={control}
          textInputConfig={{
            placeholder: '********',
            secureTextEntry: true,
          }}
          inputRef={pwRef}
        />
        <View style={styles.gap} />
        <CustomBtn
          isLoading={false}
          title="로그인"
          onPress={handleSubmit(onValid)}
        />
        <View style={styles.gap} />
        <CustomBtn
          isLoading={false}
          isGoogle
          onPress={handleSubmit(onValid)}
        />
        <View style={styles.divider} />
        <CustomBtn
          isLoading={false}
          title="회원가입"
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
  btnGroup: {
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
});
