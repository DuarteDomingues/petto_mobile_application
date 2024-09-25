import React from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity,View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Footer = ({footerPage}) => {

  const navigation = useNavigation();

    return (

<View style={styles.footer}>
<TouchableOpacity onPress={() => navigation.navigate('Add')}>

  <View style={styles.footerItem}>
    <MaterialIcons name="add-circle-outline" size={25} color={footerPage === 'add' ? '#657EFF' : '#7B6F82'} style={styles.footerIcon} />
    <Text style={styles.footerText}>Add</Text>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
  <View style={styles.footerItem}>
    <AntDesign name="message1" size={25} color={footerPage === 'messages' ? '#657EFF' : '#7B6F82'} style={styles.footerIcon} />
    <Text  style={footerPage === 'messages' ? styles.footerText2 : styles.footerText}>Messages</Text>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
  <View style={styles.footerItem}>
    <AntDesign name="home" size={25} color={footerPage === 'home' ? '#657EFF' : '#7B6F82'} style={styles.footerIcon} />
    <Text style={footerPage === 'home' ? styles.footerText2 : styles.footerText}>Home</Text>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>

  <View style={styles.footerItem}>
    <AntDesign name="hearto" size={25} color={footerPage === 'fav' ? '#657EFF' : '#7B6F82'} style={styles.footerIcon} />
    <Text style={footerPage === 'fav' ? styles.footerText2 : styles.footerText}>Favourites</Text>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>

  <View style={styles.footerItem}>
    <AntDesign name="search1" size={25} color={footerPage === 'search' ? '#657EFF' : '#7B6F82'} style={styles.footerIcon} />
    <Text style={footerPage === 'search' ? styles.footerText2 : styles.footerText}>Search</Text>
  </View>

  </TouchableOpacity>
</View>


);
};

const styles = StyleSheet.create({

footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 7,
    width: '100%',
    backgroundColor: '#ffffff', // Background color
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  footerItem: {
    alignItems: 'center',
    borderRadius: 10, // Set border radius
    overflow: 'hidden', // Hide overflow due to borderRadius
  },

  
  footerIcon: {
    marginBottom: 1,
  },
  
  footerText: {
    fontSize: 11,
    fontWeight: 'medium',
    paddingBottom: 7,
    color: '#7B6F82'
  },

  footerText2: {
    fontSize: 11,
    fontWeight: 'medium',
    paddingBottom: 7,
    color: '#657EFF'
  },


  
  padView: {
    height: 60
  },

})


export default Footer;
