import { useRef, useState, useEffect, useCallback } from 'react';
import FormLayout from '../components/FormLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import { RootStackParamList, PersonType } from '../utils/types';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { personDataState } from '../components/Atoms';
import FlexGap from '../components/FlexGap';
import FormInput from '../components/FormInput';
import RadioBtns from '../components/RadioBtns';
import { useIntl } from 'react-intl';
import Icon from 'react-native-vector-icons/Ionicons';
import { ACCESS_HINT } from '../utils/constants';

type PersonFormProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonForm'
>;

function PersonForm({ navigation }: PersonFormProps) {
  const [loading] = useState(false);
  const { formatMessage } = useIntl();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const { formState, handleSubmit, control } = useForm<
    Pick<PersonType, 'name' | 'age'>
  >({
    mode: 'onChange',
  });
  const ageRef = useRef<TextInput>(null);
  const setPersonData = useSetRecoilState(personDataState);
  const onValid = ({
    name,
    age,
  }: Pick<PersonType, 'name' | 'age'>) => {
    if (!gender) {
      return;
    }
    setPersonData(prev => [{ name, age, gender }, ...prev]);
    navigation.navigate('Home');
  };
  const HeaderRightLoader = useCallback(
    () => <ActivityIndicator color="#fff" />,
    [],
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <Icon name="add" size={35} color="#2196f3" />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoader : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
    //eslint-disable-next-line
  }, [loading]);
  return (
    <FormLayout>
      <FormInput
        name="name"
        errorMsg={formState.errors.name?.message}
        control={control}
        textInputConfig={{
          placeholder: 'enter your name...',
        }}
        onNext={() => ageRef.current?.focus()}
      />
      <FlexGap gapSize={10} />
      <FormInput
        name="age"
        constraintslabel={formatMessage({
          id: 'ageConstraintslabel',
        })}
        errorMsg={formState.errors.age?.message}
        control={control}
        textInputConfig={{
          placeholder: 'enter your age...',
          keyboardType: 'number-pad',
        }}
        inputRef={ageRef}
      />
      <FlexGap gapSize={10} />
      <RadioBtns
        labelId="genderLabel"
        testId="genderRadioBtn"
        valueArray={['male', 'female']}
        setter={setGender}
      />
      <TouchableOpacity
        onPress={handleSubmit(onValid)}
        accessibilityHint={ACCESS_HINT.ADD_BTN}>
        <Text>TestingBtn</Text>
      </TouchableOpacity>
    </FormLayout>
  );
}

export default PersonForm;
