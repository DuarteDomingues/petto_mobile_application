import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform, Image, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system";
import ImageViewer from '../../ImageViewer';



export default function FlaskTest() {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderImage = require('./../../assets/cat.jpg'); 

  const dog_data = {Species: 'CAT', Age: 'BABY', Gender: 'FEMALE', Breed: 'Persian', Color: 'BLACK', Size: 'MEDIUM', Health: 'HEALTHY', Sterilized: 'NO'};


  const [selectedImage, setSelectedImage] = useState(null);

  function doButton(){
    console.log("burron")
  }


  function toServerAttributesReq(data) {
    return fetch('http://10.0.2.2:5000/text_recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error('Error fetching data:', error));
  }

  toServerImageReq = async (mediaFile) => {

    let schema = "http://";
    let host = "10.0.2.2";
    let route = "/image_recommendations";
    let port = "5000";
    let url = "";
    let content_type = "image/jpeg";

    url = schema + host + ":" + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    console.log(response.headers);
    console.log(response.body);
  };

  

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    base64:true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.cancelled && result.assets) {
 
    setSelectedImage(result.assets[0].uri);

    await this.toServerImageReq({
      base64: result.assets[0].base64,
      uri: result.assets[0].uri,
    });

  }
}
    return (
    

    <SafeAreaView  style={styles.container}>



<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.imageContainer}>
      <ImageViewer
          placeholderImageSource={placeholderImage}
          selectedImage={selectedImage}
        />
      </View>

      
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="post test" onPress={() => toServerAttributesReq(dog_data)} />
    </View>


<TouchableOpacity onPress={doButton}>
    <View style={styles.line} />
    </TouchableOpacity>
    </SafeAreaView >

);
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center',
       // backgroundColor: '#EEEEEE'
       backgroundColor: '#FFFCFF'

      },
 
      wrapperView:{
        width:'100%',
        padding: 10,
      },


      line: {
        width: '100%',
        height: 50,
        marginTop: 17,
        marginBottom: 4,
        backgroundColor: 'red',    
      },
})