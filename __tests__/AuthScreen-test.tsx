import React from 'react';
import {
  screen,
  render,
  fireEvent,
} from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { FORM_ERR_MSG, ACCESS_HINT } from '../utils/constants';
import '@testing-library/jest-native/extend-expect';
import LoginScreen from '../screens/LoginScreen';
import SignScreen from '../screens/SignScreen';
import CustomBtn from '../components/CustomBtn';
import FormInput from '../components/FormInput';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // 에러방지코드: https://stackoverflow.com/questions/59587799/how-to-resolve-animated-usenativedriver-is-not-supported-because-the-native

const TEST_PROPS: any = {
  route: jest.fn(),
  navigation: jest.fn(),
};
const temp = ' ';
describe('LoginScreen', () => {
  test('렌더링 테스트', () => {
    const renderedJson = render(
      <LoginScreen {...TEST_PROPS} />,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});

describe('SignScreen', () => {
  test('렌더링 테스트', () => {
    const renderedJson = render(
      <SignScreen {...TEST_PROPS} />,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });

  test('패스워드확인 유효성 검사', async () => {
    render(<SignScreen {...TEST_PROPS} />);

    fireEvent.changeText(
      await screen.findByAccessibilityHint(ACCESS_HINT.PW),
      '1234',
    );

    fireEvent.changeText(
      await screen.findByAccessibilityHint(ACCESS_HINT.PW_CHECK),
      '7777',
    );
    // 비밀번호를 다르게 입력한 경우 에러메세지 출력되어야 한다.
    expect(
      await screen.findByText(FORM_ERR_MSG.passwordCheck),
    ).toBeVisible();
  });
});

describe('component', () => {
  const EMAIL_PLACEHOLDER = 'remo@naver.com';
  const TEST_TEXT = '1234';

  test('TextInput - 정규표현식 검사 - 이메일, 비밀번호', async () => {
    const PASSWORD_PLACEHOLDER = '********';
    const TestComponent = () => {
      const { formState, control } = useForm<{
        email: string;
        password: string;
      }>({
        mode: 'onChange',
      });
      return (
        <>
          <FormInput
            label="이메일"
            name="email"
            errorMsg={formState.errors.email?.message}
            control={control}
            textInputConfig={{
              placeholder: EMAIL_PLACEHOLDER,
            }}
          />
          <FormInput
            label="비밀번호"
            label2="8~16자의 영문 대소문자와 숫자 조합"
            name="password"
            errorMsg={formState.errors.password?.message}
            control={control}
            textInputConfig={{
              placeholder: PASSWORD_PLACEHOLDER,
            }}
          />
        </>
      );
    };

    render(<TestComponent />);

    fireEvent.changeText(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      TEST_TEXT,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText(PASSWORD_PLACEHOLDER),
      TEST_TEXT,
    );

    expect(
      await screen.findByText(FORM_ERR_MSG['email']),
    ).toBeVisible();

    expect(
      await screen.findByText(FORM_ERR_MSG['password']),
    ).toBeVisible();
  });

  test('TextInput - 정규표현식 검사 - 전화번호', async () => {
    const PHONE_PLACEHOLDER = '010-1234-5678';
    const TestComponent = () => {
      const { formState, control } = useForm<{ phone: string }>({
        mode: 'onChange',
      });
      return (
        <>
          <FormInput
            label="전화번호"
            label2="하이픈 포함한 숫자만 입력"
            name="phone"
            errorMsg={formState.errors.phone?.message}
            control={control}
            textInputConfig={{
              placeholder: PHONE_PLACEHOLDER,
            }}
          />
        </>
      );
    };

    render(<TestComponent />);

    fireEvent.changeText(
      screen.getByPlaceholderText(PHONE_PLACEHOLDER),
      '1234',
    );

    expect(
      await screen.findByText(FORM_ERR_MSG['phone']),
    ).toBeVisible();
  });

  test('TextInput - onChangeText 검사', async () => {
    const TestComponent = () => {
      const { control } = useForm<{ email: string }>({
        mode: 'onChange',
      });
      return (
        <>
          <FormInput
            label="이메일"
            name="email"
            errorMsg="test"
            control={control}
            textInputConfig={{
              placeholder: EMAIL_PLACEHOLDER,
            }}
          />
        </>
      );
    };

    render(<TestComponent />);

    fireEvent.changeText(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      TEST_TEXT,
    );

    expect(
      await screen.getByPlaceholderText(EMAIL_PLACEHOLDER).props
        .value,
    ).toEqual(TEST_TEXT);
  });

  test('Pressable - onPress 검사', async () => {
    const BTN_TITLE = '버튼';
    const onPressMock = jest.fn();
    const eventData = {
      nativeEvent: {
        pageX: 20,
        pageY: 30,
      },
    };

    render(
      <CustomBtn
        isLoading={false}
        title={BTN_TITLE}
        onPress={onPressMock}
      />,
    );

    fireEvent.press(screen.getByText(BTN_TITLE), eventData);

    expect(onPressMock).toHaveBeenCalledWith(eventData);
  });

  test('Pressable - loading 상황시 ActivityIndicator 렌더링 되는지 검사', async () => {
    const onPressMock = jest.fn();

    render(
      <CustomBtn
        isLoading={true}
        title="로그인"
        onPress={onPressMock}
      />,
    );

    expect(
      await screen.findByAccessibilityHint(ACCESS_HINT.LOADER),
    ).toBeDefined(); // toBeVisible 적용 안되서 toBeDefined 사용
  });
});
