import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageData = async (key: string) => {
  return JSON.parse((await AsyncStorage.getItem(key)) || 'null');
};

const setStorageData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const removeStorageData = async (key: string) =>
  await AsyncStorage.removeItem(key);

export { getStorageData, setStorageData, removeStorageData };
