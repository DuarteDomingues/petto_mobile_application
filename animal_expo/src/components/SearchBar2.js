import React from 'react';
import { View, TextInput, StyleSheet, Platform, Image } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const SearchBar2 = () => {

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={19} color="#7B6F82" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        // Add any other TextInput props or styles as needed
      />


    

    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    width: '97%',
    alignSelf: 'center',
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    marginTop: 34,
    marginBottom: 7,
    backgroundColor: 'white', // Set the background color
    borderRadius: 8,
    padding: 8,
    height: 37,

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
  },

});

export default SearchBar2;
