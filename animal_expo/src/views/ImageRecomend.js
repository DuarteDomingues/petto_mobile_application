import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Platform, Image, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system";
import ImageViewer from '../../ImageViewer';
import UserManagementService from '../services/UserManagementService';



export default function ImageRecommend() {

  const isFocused = useIsFocused();
  const userManagementService = new UserManagementService();
  
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


  const [userProfileImage, setUserProfileImage] = useState(require('../../assets/person.png'));

  let imageSource = null;
  let imgCat =  require('../../assets/icon_user.png')
  imageSource =  imgCat 


  const navigation = useNavigation();

  const placeholderImage = require('../../assets/placeadd5.png'); 
  const [selectedImage, setSelectedImage] = useState(null);


  async function loadUserImage(){

    let quests = await userManagementService.getUserPref()
    setUserProfileImage({ uri: quests[1]})
  
  }


  toServerImageReq = async (mediaFile) => {

    let schema = "http://";
    let host = "10.0.2.2";
    let route = "/image_recommendations";
    let port = "5000";
    //let url = "";
    url = 'https://myflaskapp-cccrohvifa-uw.a.run.app/image_recommendations'
    let content_type = "image/jpeg";

    //url = schema + host + ":" + port + route;
    try {

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    //check if null, se nao, recebe resposta, passa para a search com os argumentosv

    if(response){
        // console.log(response.body);

         let jsonObject = JSON.parse(response.body);
         const imageIds = jsonObject.image_ids;

         navigation.navigate('SearchPage', {
          imageIds
      });


    }
    else{
      console.log("response is null")
    }
    }
    catch (error) {
      console.error("Error uploading the file:", error);
    }
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

useEffect(() => {
    
  if(isFocused){ 
    loadUserImage();

  }
}, [isFocused]);


    return (
    

    <SafeAreaView  style={styles.container}>


<View style={styles.wrapperView}>


<View style={styles.containerTop}>
      <TouchableOpacity onPress={goBack}>


      <View  style={styles.profileImage2}>
<AntDesign name="arrowleft" size={20} color="#1D082B" style={styles.chatIcon} />
</View>

      </TouchableOpacity>
      <Text style={styles.titleTop}>Image search</Text>
      <Image source={userProfileImage} style={styles.userImage} />

    </View>

  
  <View style={styles.fillImgDesc}>
  <Text style={styles.textImage}>Find similar pets based on an image </Text>


  </View>



        

<View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View >
      <ImageViewer
          placeholderImageSource={placeholderImage}
          selectedImage={selectedImage}
        />
        
      </View>


<TouchableOpacity onPress={ pickImage}>

<View style={styles.wrapFck}>
<View style={{...styles.squareContinue,  backgroundColor: '#657EFF'}}>
<View style={{...styles.squareContent}}>
<Text style={{...styles.squareTextContinue, color: 'white'}}>Select an image</Text>
</View>
</View>
</View>
</TouchableOpacity>


    </View>

    </View>
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


      containerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        justifyContent: 'space-between',

      },
      titleTop: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        color: '#0D0D0D',
        marginLeft: 9.5

      },
      

      profileImage2: {
        width: 28, // Set the desired width
        height: 28, // Set the desired height
        borderRadius: 8, // Half of the width and height for a circular shape
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically        
        
        marginLeft: 4,
        ...Platform.select({
          android: {
            elevation: 2,
          },
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
        }),
      },

      
      userImage: {
        width: 38,
        height: 38,
        borderRadius: 20,
        marginRight: 2.5
      },

      textImage:{
        fontSize:18,
        textAlign: 'center',
        fontWeight: '400',
        color:'black',
        paddingBottom:5
      },

      fillImgDesc: {
        width:'60%',
        alignSelf: 'center',
        marginTop: '35%'
      },



      squareContinue: {
        marginTop: 12,
        width: 200,
        height: 34,
        borderColor: 'black',
        borderRadius: 10,
      //  opacity: 0.85

    backgroundColor: '#ffffff',
        alignItems: 'center',
        textAlign: 'center',

        ...Platform.select({
          android: {
            elevation: 2,
          },
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
        }),
    },

    squareContent: {
      flex: 1,
      justifyContent: 'center',
    },
    squareTextContinue: {
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'

      },  

 
    


})