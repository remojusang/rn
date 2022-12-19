import { render } from '@testing-library/react-native';
import DetailScreen from '../../screens/DetailScreen';
const ErrorBoundary = require('../../components/ErrorBoundary');

// Couldn't find a navigation object. Is your component inside NavigationContainer? 에러 방지 코드
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

describe('DetailScreen', () => {
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
    const renderedJson = render(
      <ErrorBoundary>
        <DetailScreen {...TEST_PROPS} />,
      </ErrorBoundary>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
