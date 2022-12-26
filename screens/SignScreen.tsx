import React, { useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomBtn from '../components/CustomBtn';
import FormLayout from '../components/FormLayout';
import FormInput from '../components/FormInput';
import { ACCESS_HINT } from '../utils/constants';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';
import { localeState } from '../components/Atoms';
import FlexGap from '../components/FlexGap';

type SignProps = NativeStackScreenProps<RootStackParamList, 'Sign'>;

export interface ISignForm {
  email: string;
  password: string;
  passwordCheck: string;
  phone: number;
}
function SignScreen({}: SignProps) {
  const pwRef = useRef<TextInput>(null);
  const pwCheckRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const { formState, handleSubmit, control, getValues } =
    useForm<ISignForm>({ mode: 'onChange' });
  const onValid = (form: ISignForm) => {
    console.log(form);
    //() => navigation.navigate('Sign');
  };
  const { formatMessage } = useIntl();
  const locale = useRecoilValue(localeState);
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
          constraintslabel={formatMessage({
            id: 'passwordConstraintslabel',
          })}
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
          constraintslabel={formatMessage({
            id: 'phoneConstraintslabel',
          })}
          name="phone"
          errorMsg={formState.errors.phone?.message}
          control={control}
          textInputConfig={{
            keyboardType: 'phone-pad',
            placeholder: '010-1234-5678',
          }}
          inputRef={phoneRef}
        />
        <FlexGap gapSize={10} />

        {locale === 'ko' && (
          <Text style={styles.tos}>
            아래의 회원가입 버튼을 누르면, {'\n'}{' '}
            <Text style={styles.strong}>이용규약</Text>과{' '}
            <Text style={styles.strong}>프라이버시 정책</Text>에
            동의한 것이 됩니다.
          </Text>
        )}
        {locale === 'en-US' && (
          <Text style={styles.tos}>
            By clicking the sign up button below, {'\n'} you agree to
            the <Text style={styles.strong}>Terms of Use</Text> and{' '}
            <Text style={styles.strong}>Privacy Policy</Text>
          </Text>
        )}
        <CustomBtn
          isLoading={false}
          title="signUpBtn"
          onPress={handleSubmit(onValid)}
        />
      </>
    </FormLayout>
  );
}

export default SignScreen;

const styles = StyleSheet.create({
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
