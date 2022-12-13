import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

function FormLayout({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
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
