import React, {
  memo,
  useRef,
  useCallback,
  useEffect,
  RefObject,
} from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { REGEX, FORM_ERR_MSG } from '../utils/constants';
import { useIntl } from 'react-intl';

interface Props {
  constraintslabel?: string;
  name: 'email' | 'password' | 'passwordCheck' | 'phone';
  errorMsg?: string;
  textInputConfig: ITextInputConfig;
  control: Control<any>;
  passwordVal?: string;
  accessibilityHint?: string;
  onNext?: () => void;
  inputRef?: RefObject<TextInput>;
}
type ITextInputConfig = {
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
};

function FormInput({
  constraintslabel,
  name,
  errorMsg,
  textInputConfig,
  control,
  passwordVal,
  accessibilityHint = '',
  onNext = () => {},
  inputRef,
}: Props) {
  const { formatMessage } = useIntl();
  const aniRef = useRef(new Animated.Value(0));
  const shake = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(aniRef.current, {
          toValue: -4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(aniRef.current, {
          toValue: 4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(aniRef.current, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 },
    ).start();
  }, []);
  useEffect(() => {
    if (!errorMsg) {
      return;
    }
    shake();
  }, [shake, errorMsg]);
  const isPwCheck = name === 'passwordCheck';

  return (
    <Animated.View
      style={[
        styles.inputContainer,
        {
          transform: [{ translateX: aniRef.current }],
        },
      ]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {formatMessage({ id: `${name}Label` })}
        </Text>
        <Text style={styles.constraintslabel}>
          {constraintslabel}
        </Text>
      </View>

      {/* passwordCheck input인지 아닌지 여부에 따라 Controller의 pattern, rules가 다름 */}
      {!isPwCheck ? (
        <Controller
          control={control}
          name={name}
          rules={{
            required: true,
            pattern: {
              value: REGEX[name] as RegExp,
              message: FORM_ERR_MSG[name],
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errorMsg ? styles.errorInput : styles.input}
              onChangeText={onChange}
              value={value}
              {...textInputConfig}
              autoCapitalize="none"
              accessibilityHint={accessibilityHint}
              onSubmitEditing={() => onNext()}
              ref={inputRef}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          rules={{
            required: true,
            validate: {
              samePassword: val =>
                val === passwordVal || FORM_ERR_MSG[name],
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errorMsg ? styles.errorInput : styles.input}
              onChangeText={onChange}
              value={value}
              {...textInputConfig}
              autoCapitalize="none"
              accessibilityHint={accessibilityHint}
              onSubmitEditing={() => onNext()}
              ref={inputRef}
            />
          )}
        />
      )}
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </Animated.View>
  );
}
export default memo(FormInput);

// type samePasswordParameters = {
//   val: string;
//   name: string;
//   passwordVal: string;
// };
// export const samePassword: Validate<samePasswordParameters> = ({
//   val,
//   name,
//   passwordVal,
// }): string | boolean => {
//   return val === passwordVal || FORM_ERR_MSG[name];
// };

interface ICommonInput {
  backgroundColor: string;
  padding: number;
  borderRadius: number;
  fontSize: number;
  borderWidth: number;
}
const commonInput: ICommonInput = {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 6,
  fontSize: 18,
  borderWidth: 1,
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 16,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  constraintslabel: {
    marginLeft: 20,
    fontWeight: '300',
  },
  input: {
    ...commonInput,
    borderColor: '#000',
  },
  errorInput: {
    ...commonInput,
    borderColor: 'red',
    backgroundColor: '#FFC3C3',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
});
