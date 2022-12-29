import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import ScreenLayout from '../components/ScreenLayout';
import CameraModules from '../components/CameraModules';

type CameraProps = NativeStackScreenProps<
  RootStackParamList,
  'Camera'
>;

function CameraScreen({}: CameraProps) {
  return (
    <ScreenLayout isLoading={false}>
      <CameraModules />
    </ScreenLayout>
  );
}

export default CameraScreen;
