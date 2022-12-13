export interface Person {
  name: string;
  age: number;
  gender: string;
}

import { View, Text, StyleSheet } from 'react-native';

export default function List({ item }: { item: Person }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.age}>{item.age} years old</Text>
      <Text style={styles.gender}>
        {item.gender} {item.gender == 'Male' ? '♂' : '♀'}
      </Text>
    </View>
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
