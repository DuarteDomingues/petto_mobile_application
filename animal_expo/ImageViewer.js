import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {

  
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return   <View style={styles.shadowView}>

  <Image source={imageSource} style={styles.image} />
  </View>
  ;
};

const styles = StyleSheet.create({


  shadowView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 3,
    marginTop: 24,
    borderRadius: 10,


   },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },

});

export default ImageViewer;
