import React, { useState }from 'react';
import { View, TextInput, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SearchBar3 = ({inputSearch, setInput, handleInput}) => {

  const imageSource = require('../../assets/imgs/xdedit2.png');
  const navigation = useNavigation();

 
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

        // Add any other TextInput props or styles as needed
      />
      <TouchableOpacity onPress={() => navigation.navigate('ImageRecommend') }>

      <FontAwesome5 name="camera" size={19} color="#7B6F82" style={styles.rightIcon} />
      </TouchableOpacity>

    
    </View>
<TouchableOpacity onPress={() => navigation.navigate('Filter') }>


<View  style={styles.profileImage2}>
    <Image
    source={imageSource} // Replace with the actual image path
    style={styles.profileImage}
  />
</View>

  </TouchableOpacity>


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '84.3%',
    alignSelf: 'center',
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    marginTop: 34,
    marginBottom: 7,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    padding: 8,
    height: 37,
    marginRight:11,
    marginLeft: 5,
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
    width: 29, // Set the desired width
    height: 29, // Set th+e desired height
  //  marginRight: 10, // Adjust spacing as needed
    //borderRadius: 10, // Assuming you want a circular image, adjust border radius as needed
    //marginTop: 26,
    //marginRight: 10,
    //backgroundColor: 'white',

  },

  profileImage2: {
    width: 36, // Set the desired width
    height: 37, // Set the desired height
    borderRadius: 10, // Half of the width and height for a circular shape
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    marginTop: 27.5,
    marginLeft: 4,
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






});

export default SearchBar3;
