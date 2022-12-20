import { render } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { IntlProvider } from 'react-intl';
import ErrorBoundary from '../../components/MyErrorBoundary';
import koMsg from '../../lang/ko.json';

describe('LoginScreen', () => {
  test('렌더링 테스트', () => {
    const TEST_PROPS: any = {
      route: jest.fn(),
      navigation: jest.fn(),
    };
    const renderedJson = render(
      <IntlProvider locale={'ko'} messages={koMsg}>
        <ErrorBoundary>
          <LoginScreen {...TEST_PROPS} />,
        </ErrorBoundary>
        ,
      </IntlProvider>,
    ).toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
