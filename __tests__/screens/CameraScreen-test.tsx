import { render } from '@testing-library/react-native';
import CameraScreen from '../../screens/CameraScreen';
import ErrorBoundary from '../../components/MyErrorBoundary';
// 에러 방지 => react-native-permissions: NativeModule.RNPermissions is null
jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

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

describe('CameraScreen', () => {
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
    const renderedJson = render(
      <ErrorBoundary>
        <CameraScreen {...TEST_PROPS} />,
      </ErrorBoundary>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
