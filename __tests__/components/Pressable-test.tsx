import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import { ACCESS_HINT } from '../../utils/constants';
import CustomBtn from '../../components/CustomBtn';
import { IntlProvider } from 'react-intl';
import ErrorBoundary from '../../components/MyErrorBoundary';
import koMsg from '../../lang/ko.json';

describe('component', () => {
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
      <ErrorBoundary>
        <IntlProvider locale="ko" messages={koMsg}>
          <CustomBtn
            isLoading={false}
            title={BTN_TITLE}
            onPress={onPressMock}
          />
        </IntlProvider>
      </ErrorBoundary>,
    );

    await act(() => {
      fireEvent.press(screen.getByText(BTN_TITLE), eventData);
    });

    expect(onPressMock).toHaveBeenCalledWith(eventData);
  });

  test('Pressable - loading 상황시 ActivityIndicator 렌더링 되는지 검사', async () => {
    const onPressMock = jest.fn();

    render(
      <IntlProvider locale="ko" messages={koMsg}>
        <ErrorBoundary>
          <CustomBtn
            isLoading={true}
            title="로그인"
            onPress={onPressMock}
          />
        </ErrorBoundary>
      </IntlProvider>,
    );

    expect(
      await screen.findByAccessibilityHint(ACCESS_HINT.LOADER),
    ).toBeDefined(); // toBeVisible 적용 안되서 toBeDefined 사용
  });
});
