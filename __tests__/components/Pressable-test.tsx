import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import { ACCESS_HINT } from '../../utils/constants';
import CustomBtn from '../../components/CustomBtn';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { IntlProvider } from 'react-intl';

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
        <IntlProvider locale={'test'} messages={{}}>
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
      <ErrorBoundary>
        <IntlProvider locale={'test'} messages={{}}>
          <CustomBtn
            isLoading={true}
            title="로그인"
            onPress={onPressMock}
          />
        </IntlProvider>
      </ErrorBoundary>,
    );

    expect(
      await screen.findByAccessibilityHint(ACCESS_HINT.LOADER),
    ).toBeDefined(); // toBeVisible 적용 안되서 toBeDefined 사용
  });
});
