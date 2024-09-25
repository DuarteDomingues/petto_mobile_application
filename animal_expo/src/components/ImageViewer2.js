import React from 'react';
import { View, Image, StyleSheet, Dimensions , TouchableOpacity} from 'react-native';

const ImageViewer2 = ({ selectedImage }) => {
  const windowWidth = Dimensions.get('window').width;
  const customWidth = windowWidth / 4.85;
  const imagePlaceholder =  require('../../assets/placeadd5.png');


  const imageSource = selectedImage ? { uri: selectedImage } : imagePlaceholder;


  return (
  

  <View style={styles.shadowView}>

<Image source={imageSource} style={[styles.image, { width: customWidth }]} />
</View>
)
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: 90,
    height: 90,
    overflow: 'hidden', // Ensure the image is clipped to the border radius
  },

  shadowView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 3,
    borderRadius: 50,

   },
});

export default ImageViewer2;
