import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PersonType } from '../../utils/types';

export default function Person({ item }: { item: PersonType }) {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('Detail', {
      name: item.name,
      age: item.age,
      gender: item.gender,
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.age}>{item.age} years old</Text>
      <Text style={styles.gender}>
        {item.gender} {item.gender === 'male' ? '♂' : '♀'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'rgba(50,50,50,1)',
  },
  name: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gender: {
    color: 'white',
    fontSize: 15,
  },
  age: {
    color: 'white',
    fontSize: 15,
  },
});
