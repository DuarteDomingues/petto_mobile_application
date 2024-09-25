import { StyleSheet, TouchableOpacity, View , Text, Platform, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  AntDesign, FontAwesome  } from '@expo/vector-icons';
import { useEffect } from 'react';


export default function MessageComp({userName, type, dataSince, numMsgs, selectedImage}) {



  let imgCat =  require('../../assets/person.png')
  // const imageSource = selectedImage ? { uri: selectedImage } : { uri: placeholderImageSource};
 let imageSource = null;
  
 
  if (selectedImage){
   imageSource = { uri: selectedImage }
  }
 
  else{
     imageSource =  imgCat 
   
  }



  useEffect


    return (

      <View>
 

      <View style={styles.wrapperView}>




      <View style={styles.pageHeaderaddx}>
<View style={styles.userPeterCont}>

<Image
    source={imageSource} // Replace with the actual image path
    style={styles.profileImage}
  />

<View style={styles.textContainer}>

<Text style={{...styles.pageHeaderadd, marginBottom:-2}}>{userName}</Text>

<Text style={{...styles.pageHeaderaddloc}}>{type}</Text>
</View>



<View style={styles.textContainer2}>

<Text style={{...styles.pageHeaderMinutes, marginBottom:-4}}>{dataSince}</Text>
<View style={styles.circle}>
  </View>

</View>

</View>


</View>


</View>
</View> 
    )
}

const styles = StyleSheet.create({

  wrapperView:{
    width:'100%',
    paddingLeft: 12,
    paddingBottom: 10,
    paddingRight: 12,
  },

  pageHeaderaddx: {
    paddingLeft: 6,
    paddingRight: 7,    

  },

  pageHeaderadd: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181818'
  },

  extraPad: {
    marginTop: 6
  },

  pageHeaderMinutes: {
    fontSize: 13,
    color : '#657EFF'
  },


  pageHeaderaddloc: {
    fontSize: 14,
    color: '#7B6F82',
    marginTop: 1,

  },

  pageHeaderVS: {

    paddingBottom: 2,
    paddingLeft: 14,
    paddingRight: 14,    
  
  },

  wrapperSiml:{
    paddingLeft: 10,
    paddingRight: 14,    
  },


  wrapFck:{
    padding: 14,
    marginTop: -5
  },

  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set the desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
  },

  profileImage2: {
    width: 35, // Set the desired width
    height: 35, // Set the desired height
    borderRadius: 10, // Half of the width and height for a circular shape
    marginLeft: 'auto',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    borderColor: '#899DFF', // Set the desired border color
    borderWidth: 1, // Set the desired border width

  },



    userPeterCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    //backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,

     // Shadow for Android
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



  
  textContainer: {
    flexDirection: 'column', // Vertical arrangement,
    paddingLeft: 5
  },

  textContainer2: {
    flexDirection: 'column', // Vertical arrangement,
    paddingLeft: 5,
    marginLeft: 'auto'
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 13,
    backgroundColor: '#657EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 7,
    textAlign: 'center', // Center the text horizontally

  },
  number: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    lineHeight: 15.1
  },

 



  

})