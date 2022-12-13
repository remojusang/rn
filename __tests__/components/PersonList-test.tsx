import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react-native';
import { PersonType } from '../../utils/types';
import { FlatList, Text } from 'react-native';
import '@testing-library/jest-native/extend-expect';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // 에러방지코드: https://stackoverflow.com/questions/59587799/how-to-resolve-animated-usenativedriver-is-not-supported-because-the-native

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
    const TestPerson = ({ item }: { item: PersonType }) => {
      return (
        <>
          <Text>{item.name}</Text>
        </>
      );
    };
    const TestComponent = () => {
      return (
        <FlatList
          data={sampleData as PersonType[]}
          renderItem={(props: any) => <TestPerson {...props} />}
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
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
