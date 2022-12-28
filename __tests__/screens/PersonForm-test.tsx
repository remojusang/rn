import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import PersonForm from '../../screens/PersonForm';
import ErrorBoundary from '../../components/MyErrorBoundary';
import { IntlProvider } from 'react-intl';
import koMsg from '../../lang/ko.json';
import { ACCESS_HINT } from '../../utils/constants';
import RN from 'react-native';
import '@testing-library/jest-native/extend-expect';
import { RecoilRoot } from 'recoil';
import { ReactTestInstance } from 'react-test-renderer';
// 에러 방지 => Couldn't find a navigation object. Is your component inside NavigationContainer?
// https://spin.atomicobject.com/2021/02/24/react-navigation-5-unit-testing-components/
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('PersonForm', () => {
  const TEST_PROPS: any = {
    route: jest.fn(),
    navigation: {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    },
  };
  test('렌더링 테스트', () => {
    const renderedJson = render(
      <ErrorBoundary>
        <IntlProvider locale="ko" messages={koMsg}>
          <PersonForm {...TEST_PROPS} />
        </IntlProvider>
      </ErrorBoundary>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
  test('아이템 추가', async () => {
    const TEST_AGE = 33;

    const { rerender } = render(
      <RecoilRoot>
        <IntlProvider locale="ko" messages={koMsg}>
          <PersonForm {...TEST_PROPS} />
          <HomeScreen {...TEST_PROPS} />
        </IntlProvider>
      </RecoilRoot>,
    );
    // jest.spyOn(RN, 'FlatList', 'get').mockImplementation(() => {
    //   return RN.FlatList;
    // });

    await act(async () => {
      await fireEvent.changeText(
        screen.getByPlaceholderText('enter your name...'),
        'james',
      );
      await fireEvent.changeText(
        screen.getByPlaceholderText('enter your age...'),
        TEST_AGE,
      );
      // 'male' 라디오 버튼
      await fireEvent.press(
        screen.getByTestId('genderRadioBtnInputgenderRadioBtn|0'),
      );
      // Add 버튼
      await fireEvent.press(
        await screen.getByAccessibilityHint(ACCESS_HINT.ADD_BTN),
      );
    });
    rerender(
      <RecoilRoot>
        <IntlProvider locale="ko" messages={koMsg}>
          <PersonForm {...TEST_PROPS} />
          <HomeScreen {...TEST_PROPS} />
        </IntlProvider>
      </RecoilRoot>,
    );
    expect(await screen.queryByText('James')).toBeVisible();
    expect(
      await screen.queryByText(`${TEST_AGE} years old`),
    ).toBeVisible();
    expect(await screen.queryByText('male ♂')).toBeVisible();
  });
});
