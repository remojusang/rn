import { Text } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useIntl } from 'react-intl';

interface Props {
  labelId: string;
  testId: string;
  valueArray: any[];
  setter: React.Dispatch<React.SetStateAction<any>>;
}

function RadioBtns({ labelId, testId, valueArray, setter }: Props) {
  const { formatMessage } = useIntl();
  const radio_props = valueArray.map(cur => {
    return { label: formatMessage({ id: cur }), value: cur };
  });

  return (
    <>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 10,
        }}>
        {formatMessage({ id: labelId })}
      </Text>
      <RadioForm
        radio_props={radio_props}
        initial={0}
        formHorizontal={false}
        labelHorizontal={true}
        animation={true}
        onPress={value => {
          setter(value);
        }}
        testID={testId}
      />
    </>
  );
}

export default RadioBtns;
