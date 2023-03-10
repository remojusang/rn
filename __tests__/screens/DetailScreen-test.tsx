import { render } from '@testing-library/react-native';
import DetailScreen from '../../screens/DetailScreen';
import ErrorBoundary from '../../components/MyErrorBoundary';

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
