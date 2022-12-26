import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import { FORM_ERR_MSG } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import '@testing-library/jest-native/extend-expect';
import { IntlProvider } from 'react-intl';
import ErrorBoundary from '../../components/MyErrorBoundary';
import koMsg from '../../lang/ko.json';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('TextInput', () => {
  const TEST_TEXT = '1234';
  const EMAIL_PLACEHOLDER = 'remo@naver.com';

  test('정규표현식 검사 - 이메일, 비밀번호', async () => {
    const PASSWORD_PLACEHOLDER = '********';
    const TestComponent = () => {
      const { formState, control } = useForm<{
        email: string;
        password: string;
      }>({
        mode: 'onChange',
      });
      return (
        <ErrorBoundary>
          <FormInput
            name="email"
            errorMsg={formState.errors.email?.message}
            control={control}
            textInputConfig={{
              placeholder: EMAIL_PLACEHOLDER,
            }}
          />
          <FormInput
            constraintslabel="8~16자의 영문 대소문자와 숫자 조합"
            name="password"
            errorMsg={formState.errors.password?.message}
            control={control}
            textInputConfig={{
              placeholder: PASSWORD_PLACEHOLDER,
            }}
          />
        </ErrorBoundary>
      );
    };

    render(
      <IntlProvider locale="ko" messages={koMsg}>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
        ,
      </IntlProvider>,
    );

    await act(async () => {
      await fireEvent.changeText(
        screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
        TEST_TEXT,
      );

      await fireEvent.changeText(
        screen.getByPlaceholderText(PASSWORD_PLACEHOLDER),
        TEST_TEXT,
      );
    });
    // 정규표현식 검사 실패시
    expect(await screen.findByText(FORM_ERR_MSG.email)).toBeVisible();

    expect(
      await screen.findByText(FORM_ERR_MSG.password),
    ).toBeVisible();

    await act(async () => {
      await fireEvent.changeText(
        await screen.findByPlaceholderText(EMAIL_PLACEHOLDER),
        EMAIL_PLACEHOLDER,
      );

      await fireEvent.changeText(
        await screen.findByPlaceholderText(PASSWORD_PLACEHOLDER),
        'abcd12345678',
      );
    });
    // 정규표현식 검사 성공시
    expect(await screen.queryByText(FORM_ERR_MSG.email)).toBeNull();

    expect(
      await screen.queryByText(FORM_ERR_MSG.password),
    ).toBeNull();
  });

  test('정규표현식 검사 - 전화번호', async function () {
    jest.setTimeout(10000); // 에러 방지: Exceeded timeout of 5000 ms for a test
    const PHONE_PLACEHOLDER = '010-1234-5678';
    const TestComponent = () => {
      const { formState, control } = useForm<{ phone: string }>({
        mode: 'onChange',
      });
      return (
        <ErrorBoundary>
          <FormInput
            constraintslabel="하이픈 포함한 숫자만 입력"
            name="phone"
            errorMsg={formState.errors.phone?.message}
            control={control}
            textInputConfig={{
              placeholder: PHONE_PLACEHOLDER,
            }}
          />
        </ErrorBoundary>
      );
    };

    render(
      <IntlProvider locale="ko" messages={koMsg}>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
        ,
      </IntlProvider>,
    );

    await act(async () => {
      await fireEvent.changeText(
        screen.getByPlaceholderText(PHONE_PLACEHOLDER),
        '1234',
      );
    });

    // 정규표현식 검사 실패시
    expect(await screen.findByText(FORM_ERR_MSG.phone)).toBeVisible();

    await act(async () => {
      await fireEvent.changeText(
        await screen.findByPlaceholderText(PHONE_PLACEHOLDER),
        PHONE_PLACEHOLDER,
      );
    });

    // 정규표현식 검사 성공시
    expect(await screen.queryByText(FORM_ERR_MSG.phone)).toBeNull();
  });

  test('onChangeText 검사', async () => {
    const TestComponent = () => {
      const { control } = useForm<{ email: string }>({
        mode: 'onChange',
      });
      return (
        <>
          <FormInput
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

    render(
      <IntlProvider locale="ko" messages={koMsg}>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
        ,
      </IntlProvider>,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      TEST_TEXT,
    );

    expect(
      await screen.getByPlaceholderText(EMAIL_PLACEHOLDER).props
        .value,
    ).toEqual(TEST_TEXT);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
