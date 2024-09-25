import { StyleSheet, TouchableOpacity, View , Text, Platform, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  AntDesign, FontAwesome  } from '@expo/vector-icons';
import { useEffect } from 'react';


export default function FavouriteComp({petName, breed, timeFav, selectedImage, petId}) {

  const navigation = useNavigation();

  const animalId = petId

  let imgCat =  require('../../assets/cat.jpg')
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
  <TouchableOpacity onPress={() => navigation.navigate('AnimalPage', {
    animalId })} >
    <View style = {styles.rowContent}>

    <Image
 source={imageSource} // Replace with the actual image path
 style={styles.profileImage}
 />
 
    <View style={styles.containerTextIcons}>
    <Text style={styles.textTitle}>{petName}</Text>
 
  <View style={styles.iconTextContainer}>

 
  <Text style={styles.textDesc}>{timeFav}</Text>
 
      </View>
 
      </View>
      
    </View>

    <View style={styles.extraPad}></View>
    </TouchableOpacity>
    
    )
}

const styles = StyleSheet.create({

  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 19,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  

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


  
  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set the desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2 
  },

  iconTextContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  extraPad:{
    height:5
  },
  icon: {
    marginRight: 3,
    width: 15,
    height: 15,
    marginBottom:-4
  },

  icon2: {
    marginRight: 8,
    width: 15,
    height: 15,
    marginBottom:-2
  },



  textTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181818'

  },

  textDesc: {
    fontSize: 14,
    marginRight: 10,
    color: '#7B6F82',
    fontWeight: '400'

  },

  cardText: {
    fontSize: 14,
    color: '#7B6F82',
    fontWeight: '400'
  },



  

})