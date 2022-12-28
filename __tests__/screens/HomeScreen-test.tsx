import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import ErrorBoundary from '../../components/MyErrorBoundary';
import { IntlProvider } from 'react-intl';
import koMsg from '../../lang/ko.json';
import RN from 'react-native';

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

jest.spyOn(RN, 'FlatList', 'get').mockImplementation(() => {
  return RN.FlatList;
});

describe('HomeScreen', () => {
  const TEST_PROPS: any = {
    route: jest.fn(),
    navigation: jest.fn(),
  };
  test('렌더링 테스트', () => {
    const renderedJson = render(
      <ErrorBoundary>
        <IntlProvider locale="ko" messages={koMsg}>
          <HomeScreen {...TEST_PROPS} />
        </IntlProvider>
      </ErrorBoundary>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
  test('아이템 추가', async () => {
    render(
      <ErrorBoundary>
        <IntlProvider locale="ko" messages={koMsg}>
          <HomeScreen {...TEST_PROPS} />
        </IntlProvider>
      </ErrorBoundary>,
    );
    // 리스트 아이템 추가버튼 클릭
    // await act(() => {
    //   fireEvent.press();
    // });
  });
});
