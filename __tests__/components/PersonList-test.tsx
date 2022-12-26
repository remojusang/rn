import { screen, render } from '@testing-library/react-native';
import { PersonType } from '../../utils/types';
import '@testing-library/jest-native/extend-expect';
import Person from '../../components/ListItem/Person';
import { FlatList } from 'react-native';
import ErrorBoundary from '../../components/MyErrorBoundary';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
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

describe('PersonList', () => {
  test('렌더링 테스트', async () => {
    const sampleData: PersonType[] = [
      {
        name: 'remo',
        gender: 'male',
        age: 25,
      },
      {
        name: 'memo',
        gender: 'female',
        age: 22,
      },
    ];

    render(
      <ErrorBoundary>
        <FlatList
          data={sampleData as PersonType[]}
          renderItem={(props: any) => <Person {...props} />}
          keyExtractor={(item: any) => item.name}
        />
      </ErrorBoundary>,
    );

    // 리스트에 name이 정상적으로 표시되는지 확인
    expect(
      await screen.queryByText(sampleData[0].name),
    ).toBeVisible();
    expect(
      await screen.queryByText(sampleData[1].name),
    ).toBeVisible();
    expect(
      await screen.queryByText(sampleData[0].gender + ' ♂'),
    ).toBeVisible();
    expect(
      await screen.queryByText(sampleData[1].gender + ' ♀'),
    ).toBeVisible();
    expect(
      await screen.queryByText(sampleData[0].age + ' years old'),
    ).toBeVisible();
    expect(
      await screen.queryByText(sampleData[1].age + ' years old'),
    ).toBeVisible();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
