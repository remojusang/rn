import { render } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

describe('LoginScreen', () => {
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
    const renderedJson = render(
      <LoginScreen {...TEST_PROPS} />,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
