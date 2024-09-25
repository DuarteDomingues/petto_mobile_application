import React, { useState } from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';

const MyPage = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to My Page</Text>
      <Text style={styles.text}>This is a simple React Native page.</Text>
      <Text style={styles.text}>Counter: {counter}</Text>
      <Button title="Increment Counter" onPress={incrementCounter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MyPage;
