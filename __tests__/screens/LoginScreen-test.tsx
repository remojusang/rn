import { render } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { IntlProvider } from 'react-intl';

describe('LoginScreen', () => {
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
    const renderedJson = render(
      <IntlProvider locale={'test'} messages={{}}>
        <LoginScreen {...TEST_PROPS} />,
      </IntlProvider>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
