import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type ScreenLayoutProps = {
  isLoading: boolean;
  children: React.ReactNode;
};
function ScreenLayout({ isLoading, children }: ScreenLayoutProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(50,50,50,1)',
      }}>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        children
      )}
    </View>
  );
}

export default ScreenLayout;
