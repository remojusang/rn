import { render } from '@testing-library/react-native';
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
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
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
});
