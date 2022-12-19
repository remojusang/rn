import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import { FORM_ERR_MSG, ACCESS_HINT } from '../../utils/constants';
import SignScreen from '../../screens/SignScreen';
import '@testing-library/jest-native/extend-expect';
const ErrorBoundary = require('../../components/ErrorBoundary');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // 에러방지코드: https://stackoverflow.com/questions/59587799/how-to-resolve-animated-usenativedriver-is-not-supported-because-the-native

describe('SignScreen', () => {
  const TEST_PROPS: any = {
    route: jest.fn(),
    navigation: jest.fn(),
  };
  test('렌더링 테스트', () => {
    const renderedJson = render(
      <ErrorBoundary>
        <SignScreen {...TEST_PROPS} />,
      </ErrorBoundary>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });

  test('패스워드확인 유효성 검사', async () => {
    render(
      <ErrorBoundary>
        <SignScreen {...TEST_PROPS} />
      </ErrorBoundary>,
    );

    await act(async () => {
      fireEvent.changeText(
        await screen.findByAccessibilityHint(ACCESS_HINT.PW),
        '1234',
      );

      fireEvent.changeText(
        await screen.findByAccessibilityHint(ACCESS_HINT.PW_CHECK),
        '7777',
      );
    });

    // 비밀번호를 다르게 입력한 경우 에러메세지 출력되어야 한다.
    expect(
      await screen.findByText(FORM_ERR_MSG.passwordCheck),
    ).toBeVisible();

    await act(async () => {
      fireEvent.changeText(
        await screen.findByAccessibilityHint(ACCESS_HINT.PW_CHECK),
        '1234',
      );
    });
    // 비밀번호를 같게 입력한 경우 에러메세지 unmount 되어야 한다.
    expect(
      await screen.queryByText(FORM_ERR_MSG.passwordCheck),
    ).toBeNull();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
