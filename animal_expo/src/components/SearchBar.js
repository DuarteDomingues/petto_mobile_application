import React from 'react';
import { View, TextInput, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/FirebaseModule'; // Adjust the path as needed


const SearchBar = ({userImage, inputSearch, setInput, handleInput}) => {

  const imageSource = require('../../assets/person.png');
  const navigation = useNavigation();
  let userIdd = auth.currentUser.uid;

  let userImage2 = null;

  if (userImage){


    userImage2 = { uri: userImage }
  }
 
  else{
    userImage2 =  imageSource 
   
  }


  return (
    <View style={styles.container2}>
    <View style={styles.container}>
      <MaterialIcons name="search" size={19} color="#7B6F82" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name or image..."
        onSubmitEditing={handleInput}
        onChangeText={setInput}
        value={inputSearch}



      />

<TouchableOpacity onPress={() => navigation.navigate('ImageRecommend') }>

      <FontAwesome5 name="camera" size={19} color="#7B6F82" style={styles.rightIcon} />
      </TouchableOpacity>
    
    </View>
<TouchableOpacity onPress={() => navigation.navigate('UserPage',{
userIdd}) }>


    <Image
    source={userImage2} // Replace with the actual image path
    style={styles.profileImage}
  />
  </TouchableOpacity>


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '80.2%',
    alignSelf: 'center',
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    marginTop: 34,
    marginBottom: 7,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    padding: 8,
    height: 37,
    marginRight:15,

    // Shadow for Android
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },

  container2: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',

  },


  icon: {
    marginRight: 8, // Add spacing between icon and text
  },
  input: {
    fontSize: 16,
    flex: 1, // Allow TextInput to take up remaining space
    color: '#7B6F82',
  },
  rightIcon: {
    marginRight: 5,
  },
  profileImage: {
    width: 45, // Set the desired width
    height: 45, // Set th+e desired height
    marginRight: 10, // Adjust spacing as needed
    borderRadius: 25, // Assuming you want a circular image, adjust border radius as needed
    marginTop: 26,
    marginRight: 10
  },



});

export default SearchBar;
