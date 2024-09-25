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
    width: '92%',
    height: 0.6,
    backgroundColor: '#657EFF',
    alignSelf: 'center',
    //#899DFF
    marginTop: 11
    //#D9D9D9
  },
});

export default Line;
