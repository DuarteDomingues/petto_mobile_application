import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ImageViewer2 from './ImageViewer2'; // Make sure to import the correct path
import * as ImagePicker from 'expo-image-picker';

const ImageRowViewer = ({ images }) => {


  const imagePlaceholder =  require('../../assets/add_pck5.png');

  const pickImage = async (setSelectedImg) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled && result.assets) {

      let imgUri = result.assets[0].uri;

      setSelectedImg(imgUri)

     // let fileName = imgUri.split("/").pop();

    //  const uploadResp = await userService.uploadToFirebase(imgUri, fileName, (v) =>
    //  console.log(v)
   // );
   // console.log(uploadResp);

    }
  }


    return (
    <View style={styles.imageRow}>
      {images.map((image, index) => (

<View style={styles.shadowView}>


<TouchableOpacity onPress={() => pickImage(image.setSelected)} style={styles.centerImg}>

        <ImageViewer2
        style={styles.xd}
          key={index}
          placeholderImageSource={imagePlaceholder}
          selectedImage={image.selected}
          
        />
        </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 8,

  },
  xd:{
    borderRadius: 10
  },

  shadowView: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 3

   },



});

export default ImageRowViewer;
