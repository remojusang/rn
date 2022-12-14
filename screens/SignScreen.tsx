import React, { useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomBtn from '../components/CustomBtn';
import FormLayout from '../components/FormLayout';
import FormInput from '../components/FormInput';
import { ACCESS_HINT } from '../utils/constants';

type SignProps = NativeStackScreenProps<RootStackParamList, 'Sign'>;

export interface ISignForm {
  email: string;
  password: string;
  passwordCheck: string;
  phone: number;
}
function SignScreen({ route, navigation }: SignProps) {
  const pwRef = useRef<TextInput>(null);
  const pwCheckRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const { formState, handleSubmit, control, getValues, setFocus } =
    useForm<ISignForm>({ mode: 'onChange' });
  const onValid = (form: ISignForm) => {
    //() => navigation.navigate('Sign');
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
          label2="8~16자의 영문 대소문자와 숫자 조합"
          name="password"
          errorMsg={formState.errors.password?.message}
          control={control}
          textInputConfig={{
            placeholder: '********',
            secureTextEntry: true,
          }}
          accessibilityHint={ACCESS_HINT.PW}
          onNext={() => pwCheckRef.current?.focus()}
          inputRef={pwRef}
        />
        <FormInput
          label="비밀번호 확인"
          name="passwordCheck"
          passwordVal={getValues('password')}
          errorMsg={formState.errors.passwordCheck?.message}
          control={control}
          textInputConfig={{
            placeholder: '********',
            secureTextEntry: true,
          }}
          accessibilityHint={ACCESS_HINT.PW_CHECK}
          onNext={() => phoneRef.current?.focus()}
          inputRef={pwCheckRef}
        />
        <FormInput
          label="전화번호"
          label2="하이픈 포함한 숫자만 입력"
          name="phone"
          errorMsg={formState.errors.phone?.message}
          control={control}
          textInputConfig={{
            keyboardType: 'phone-pad',
            placeholder: '010-1234-5678',
          }}
          inputRef={phoneRef}
        />
        <View style={styles.gap} />
        <Text style={styles.tos}>
          아래의 회원가입 버튼을 누르면, {'\n'}{' '}
          <Text style={styles.strong}>이용규약</Text>과{' '}
          <Text style={styles.strong}>프라이버시 정책</Text>에 동의한
          것이 됩니다.
        </Text>
        <CustomBtn
          isLoading={true}
          title="회원가입"
          onPress={handleSubmit(onValid)}
        />
      </>
    </FormLayout>
  );
}

export default SignScreen;

const styles = StyleSheet.create({
  gap: {
    marginVertical: 5,
  },
  btnGroup: {
    marginBottom: 20,
  },
  // termOfService
  tos: {
    width: '100%',
    fontSize: 14,
    marginBottom: 20,
  },
  strong: {
    color: '#4583FF',
  },
});
