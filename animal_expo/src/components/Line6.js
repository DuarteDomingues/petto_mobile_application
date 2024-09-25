// Line.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Line6 = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '97%',
    height: 0.3,
    marginTop: 17,
    marginBottom: 8,
    backgroundColor: '#899DFF',
    alignSelf: 'center',
    //#899DFF
    
  },
});

export default Line6;
