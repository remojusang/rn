import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};

function FormLayout({ children }: Props) {
  const quitKeyboard = () => Keyboard.dismiss();
  return (
    <TouchableWithoutFeedback onPress={quitKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ width: '100%' }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default FormLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
