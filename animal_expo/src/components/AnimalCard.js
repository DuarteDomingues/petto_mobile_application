import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const AnimalCard = ({ title, location, imgLink }) => {


  return (
    <View style={styles.card}>
      <Image source={imgLink} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View style={styles.squareContainer}>
          <View style={styles.smallSquare}>
            <Text style={styles.squareText}>young</Text>
          </View>
          <View style={styles.smallSquare}>
            <Text style={styles.squareText}>young</Text>
          </View>
          <View style={styles.smallSquare}>
            <Text style={styles.squareText}>young</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  squareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallSquare: {
    width: 49,
    height: 19,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 5,
    justifyContent: 'center',

  },
  squareText: {
    textAlign: 'center',
    fontWeight: 'light',
  },
  card: {
    width: '48%',
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default AnimalCard;