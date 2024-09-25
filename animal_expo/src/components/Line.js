// Line.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Line = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 0.6,
    marginTop: 17,
    marginBottom: 4,
    backgroundColor: '#899DFF',
    alignSelf: 'center',
    //#899DFF
    
  },
});

export default Line;
