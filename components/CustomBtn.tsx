import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ImageStyle,
} from 'react-native';
import { ACCESS_HINT } from '../utils/constants';
import { useIntl } from 'react-intl';

interface Props {
  title?: string;
  color?: string;
  isGoogle?: boolean;
  onPress: () => void;
  isLoading: boolean;
}

function CustomBtn({
  title,
  color = '#2F2F33',
  isGoogle = false,
  onPress,
  isLoading,
}: Props) {
  const { formatMessage } = useIntl();
  return (
    <View style={styles.container}>
      {!isGoogle ? (
        <Pressable
          onPress={onPress}
          style={({ pressed }) =>
            !pressed
              ? { ...btnStyle, backgroundColor: color }
              : {
                  ...btnStyle,
                  opacity: 0.7,
                  backgroundColor: color,
                }
          }>
          {isLoading ? (
            <ActivityIndicator
              accessibilityHint={ACCESS_HINT.LOADER}
              color="white"
            />
          ) : (
            <Text style={styles.text}>
              {formatMessage({ id: title })}
            </Text>
          )}
        </Pressable>
      ) : (
        <Pressable
          onPress={onPress}
          style={({ pressed }) =>
            !pressed
              ? styles.googleBtn
              : {
                  ...btnStyle,
                  opacity: 0.7,
                  backgroundColor: '#4649FF',
                }
          }>
          {isLoading ? (
            <ActivityIndicator
              color="white"
              accessibilityHint={ACCESS_HINT.LOADER}
            />
          ) : (
            <View style={styles.btnLayout}>
              <Image
                style={styles.logo as ImageStyle}
                source={require('../assets/google_logo.png')}
              />
              <Text style={styles.text}>
                {formatMessage({ id: title })}
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

export default CustomBtn;

interface IBtnStyle {
  borderRadius: number;
  padding: number;
}

const btnStyle: IBtnStyle = {
  borderRadius: 10,
  padding: 12,
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
  },
  btnLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginRight: 10,
  },
  googleBtn: {
    ...btnStyle,
    backgroundColor: '#4649FF',
  },
});
