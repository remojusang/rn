import { screen, render } from '@testing-library/react-native';
import { PersonType } from '../../utils/types';
import '@testing-library/jest-native/extend-expect';
import Person from '../../components/Person';
import { FlatList } from 'react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // 에러방지코드: https://stackoverflow.com/questions/59587799/how-to-resolve-animated-usenativedriver-is-not-supported-because-the-native
// useNavigation 사용시 에러방지 코드
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
    const TestComponent = () => {
      return (
        <FlatList
          data={sampleData as PersonType[]}
          renderItem={(props: any) => <Person {...props} />}
          keyExtractor={(item: any) => item.name}
        />
      );
    };
    render(<TestComponent />);

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
